// ...existing code...
// --- All routes below ---

// ...existing code...


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fileStore = require('./fileStore');
const { v4: uuidv4 } = require('uuid');



const app = express();
app.use(cors());
app.use(express.json());





// Auth middleware
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// --- All routes below ---


// Get employee profile
app.get('/api/employee/profile', auth, async (req, res) => {
  if (req.user.role !== 'employee') {
    return res.status(403).json({ error: 'Access denied' });
  }
  try {
    const user = await fileStore.getUserById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Update employee profile
app.put('/api/employee/profile', auth, async (req, res) => {
  if (req.user.role !== 'employee') {
    console.error('Access denied: role is', req.user.role);
    return res.status(403).json({ error: 'Access denied' });
  }
  const { name, email, password } = req.body;
  console.log('Profile update request:', { id: req.user.id, name, email, password });
  const update = {};
  if (name) update.name = name;
  if (email) update.email = email;
  if (password) update.password = await bcrypt.hash(password, 10);
  try {
    const user = await fileStore.updateUser(req.user.id, update);
    if (!user) {
      console.error('User not found for id:', req.user.id);
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ...existing code...

// Auth middleware
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Email verification for employee registration
const crypto = require('crypto');
const transporter = require('./mailer');


app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check for duplicate email, but allow if status is 'deleted'
    const existing = await fileStore.getUserByEmail(email);
    if (existing && existing.status !== 'deleted') {
      return res.status(400).json({ error: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    let userData = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      role: 'customer',
      status: 'active',
    };
    await fileStore.addUser(userData);

    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await fileStore.getUserByEmail(email);
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    if (user.role === 'employee' && user.status !== 'active') {
      return res.status(403).json({ error: 'Your account is pending approval by an administrator.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Quote request endpoint
app.post('/api/quote', auth, async (req, res) => {
  const { device, issue, details, phone, email, location } = req.body;
  try {
    const quote = {
      id: uuidv4(),
      user: req.user.id,
      device,
      issue,
      details,
      phone,
      email,
      location,
      status: 'pending',
      assignedTo: null,
      comments: [],
      createdAt: new Date().toISOString()
    };
    await fileStore.addQuote(quote);
    res.status(201).json({ message: 'Quote request submitted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Get quotes for the logged-in customer
app.get('/api/my-quotes', auth, async (req, res) => {
  if (req.user.role !== 'customer') {
    return res.status(403).json({ error: 'Access denied' });
  }
  try {
    const quotes = await fileStore.getAllQuotes();
    const myQuotes = quotes.filter(q => q.user === req.user.id);
    res.json(myQuotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Update quote status or assignment (employee only)
app.patch('/api/quotes/:id', auth, async (req, res) => {
  if (req.user.role !== 'employee') {
    return res.status(403).json({ error: 'Access denied' });
  }
  const { status, assignedTo } = req.body;
  const update = {};
  if (status) {
      if (!['pending', 'reviewed', 'completed', 'archived'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }
      update.status = status;
  }
  if (assignedTo !== undefined) {
    update.assignedTo = assignedTo || null;
  }
  try {
    const quote = await fileStore.updateQuote(req.params.id, update);
    if (!quote) return res.status(404).json({ error: 'Quote not found' });
    res.json(quote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Add a comment to a quote (employee only)
app.post('/api/quotes/:id/comments', auth, async (req, res) => {
  if (req.user.role !== 'employee') {
    return res.status(403).json({ error: 'Access denied' });
  }
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Comment text required' });
  try {
    const quote = await fileStore.getQuoteById(req.params.id);
    if (!quote) return res.status(404).json({ error: 'Quote not found' });
    quote.comments = quote.comments || [];
    quote.comments.push({ author: req.user.id, text, createdAt: new Date().toISOString() });
    await fileStore.updateQuote(req.params.id, { comments: quote.comments });
    res.json(quote.comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get comments for a quote (employee or customer)
app.get('/api/quotes/:id/comments', auth, async (req, res) => {
  try {
    const quote = await fileStore.getQuoteById(req.params.id);
    if (!quote) return res.status(404).json({ error: 'Quote not found' });
    const users = await fileStore.getAllUsers();
    // Attach author info to each comment
    const commentsWithAuthor = (quote.comments || []).map(c => {
      const author = users.find(u => u.id === c.author);
      return {
        ...c,
        author: author ? { name: author.name, email: author.email } : { name: 'Employee', email: '' }
      };
    });
    res.json(commentsWithAuthor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get all employees (for assignment dropdown)
app.get('/api/employees', auth, async (req, res) => {
  if (req.user.role !== 'employee') {
    return res.status(403).json({ error: 'Access denied' });
  }
  try {
    const users = await fileStore.getAllUsers();
    const employees = users.filter(u => u.role === 'employee').map(u => ({ id: u.id, name: u.name, email: u.email }));
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Employee dashboard stats
app.get('/api/employee/stats', auth, async (req, res) => {
  if (req.user.role !== 'employee') {
    return res.status(403).json({ error: 'Access denied' });
  }
  try {
    const quotes = await fileStore.getAllQuotes();
    const total = quotes.length;
    const pending = quotes.filter(q => q.status === 'pending').length;
    const reviewed = quotes.filter(q => q.status === 'reviewed').length;
    const completed = quotes.filter(q => q.status === 'completed').length;
    res.json({ total, pending, reviewed, completed });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get all quotes (employee only)
app.get('/api/quotes', auth, async (req, res) => {
  if (req.user.role !== 'employee') {
    return res.status(403).json({ error: 'Access denied' });
  }
  try {
    const quotes = await fileStore.getAllQuotes();
    const users = await fileStore.getAllUsers();
    // Exclude archived quotes for employees
    const activeQuotes = quotes.filter(q => q.status !== 'archived');
    const quotesWithUser = activeQuotes.map(q => {
      const user = users.find(u => u.id === q.user);
      return {
        ...q,
        user: user ? { name: user.name, email: user.email, phone: user.phone || '-' } : { name: '-', email: '-', phone: '-' }
      };
    });
    res.json(quotesWithUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a quote (employee only)
app.delete('/api/quotes/:id', auth, async (req, res) => {
  if (req.user.role !== 'employee') {
    return res.status(403).json({ error: 'Access denied' });
  }
  try {
    const success = await fileStore.deleteQuote(req.params.id);
    if (!success) return res.status(404).json({ error: 'Quote not found' });
    res.json({ message: 'Quote deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
