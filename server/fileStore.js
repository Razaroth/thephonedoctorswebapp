// Delete a quote by id
async function deleteQuote(id) {
  const quotes = await getAllQuotes();
  const idx = quotes.findIndex(q => q.id === id);
  if (idx === -1) return false;
  quotes.splice(idx, 1);
  await writeJson(quotesFile, quotes);
  return true;
}
// fileStore.js
// Simple file-based data access for users and quotes
const fs = require('fs').promises;
const path = require('path');

const dataDir = path.join(__dirname, 'data');
const usersFile = path.join(dataDir, 'users.json');
const quotesFile = path.join(dataDir, 'quotes.json');

async function ensureDataFiles() {
  await fs.mkdir(dataDir, { recursive: true });
  for (const file of [usersFile, quotesFile]) {
    try {
      await fs.access(file);
    } catch {
      await fs.writeFile(file, '[]');
    }
  }
}

async function readJson(file) {
  await ensureDataFiles();
  const data = await fs.readFile(file, 'utf8');
  return JSON.parse(data);
}

async function writeJson(file, data) {
  await ensureDataFiles();
  await fs.writeFile(file, JSON.stringify(data, null, 2));
}

// USERS
async function getAllUsers() {
  return readJson(usersFile);
}

async function getUserById(id) {
  const users = await getAllUsers();
  return users.find(u => u.id === id);
}

async function getUserByEmail(email) {
  const users = await getAllUsers();
  return users.find(u => u.email === email);
}

async function addUser(user) {
  const users = await getAllUsers();
  users.push(user);
  await writeJson(usersFile, users);
}

async function updateUser(id, update) {
  const users = await getAllUsers();
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...update };
  await writeJson(usersFile, users);
  return users[idx];
}

// QUOTES
async function getAllQuotes() {
  return readJson(quotesFile);
}

async function getQuoteById(id) {
  const quotes = await getAllQuotes();
  return quotes.find(q => q.id === id);
}

async function addQuote(quote) {
  const quotes = await getAllQuotes();
  quotes.push(quote);
  await writeJson(quotesFile, quotes);
}

async function updateQuote(id, update) {
  const quotes = await getAllQuotes();
  const idx = quotes.findIndex(q => q.id === id);
  if (idx === -1) return null;
  quotes[idx] = { ...quotes[idx], ...update };
  await writeJson(quotesFile, quotes);
  return quotes[idx];
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  addUser,
  updateUser,
  getAllQuotes,
  getQuoteById,
  addQuote,
  updateQuote,
  deleteQuote,
};
