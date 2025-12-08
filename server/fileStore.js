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
let usersCache = null;
async function loadUsersCache() {
  if (!usersCache) {
    usersCache = await readJson(usersFile);
  }
}

async function getAllUsers() {
  await loadUsersCache();
  return usersCache;
}

async function getUserById(id) {
  await loadUsersCache();
  return usersCache.find(u => u.id === id);
}

async function getUserByEmail(email) {
  await loadUsersCache();
  return usersCache.find(u => u.email === email);
}

async function addUser(user) {
  await loadUsersCache();
  usersCache.push(user);
  await writeJson(usersFile, usersCache);
}

async function updateUser(id, update) {
  await loadUsersCache();
  const idx = usersCache.findIndex(u => u.id === id);
  if (idx === -1) return null;
  usersCache[idx] = { ...usersCache[idx], ...update };
  await writeJson(usersFile, usersCache);
  return usersCache[idx];
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
