// resetData.js
// Script to clear all user and quote data for a fresh start
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
const usersFile = path.join(dataDir, 'users.json');
const quotesFile = path.join(dataDir, 'quotes.json');

fs.writeFileSync(usersFile, '[]');
fs.writeFileSync(quotesFile, '[]');

console.log('All user and quote data has been reset.');
