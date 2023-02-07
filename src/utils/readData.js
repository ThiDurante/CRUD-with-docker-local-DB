const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, '../talker.json');

const readData = async () => {
  const data = await fs.readFile(talkerPath, 'utf-8');
  return data;
};

module.exports = readData;
