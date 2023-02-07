const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const ageValidator = require('../middlewares/ageValidator');
const nameValidator = require('../middlewares/nameValidator');
const rateValidator = require('../middlewares/rateValidator');
const talkValidator = require('../middlewares/talkValidator');
const tokenValidator = require('../middlewares/tokenValidator');
const watchedAtValidator = require('../middlewares/watchedAtValidator');
const readData = require('../utils/readData');

const talkerPath = path.resolve(__dirname, '../talker.json');

const talkerRouter = express.Router();

talkerRouter.get('/', async (req, res) => {
  const data = await readData();
  res.status(200).json(JSON.parse(data) || []);
});

talkerRouter.get('/search', tokenValidator, async (req, res) => {
  const data = JSON.parse(await readData());
  if (!req.query.q) {
    res.status(200).json(data);
  } else {
    console.log(data);
    const resultArr = data.filter((el) => el.name.includes(req.query.q));
  
    res.status(200).json(resultArr);
  }
});

talkerRouter.get('/:id', async (req, res) => {
  try {
    const data = await readData();
    const findId = JSON.parse(data)
      .filter((el) => +el.id === +req.params.id)
      .pop();
    if (!findId) {
      res.status(404).json({
        message: 'Pessoa palestrante não encontrada',
      });
    }
    res.status(200).json(findId);
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

talkerRouter.post(
  '/',
  tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  watchedAtValidator,
  rateValidator,
  async (req, res) => {
      const data = JSON.parse(await readData());
      const newUser = req.body;
      newUser.id = data[data.length - 1].id + 1;
      const newData = [...data, newUser];
      await fs.writeFile(talkerPath, JSON.stringify(newData));
      res.status(201).json(
        newUser,
);
  },
);

talkerRouter.put('/:id', 
tokenValidator,
nameValidator,
ageValidator,
talkValidator,
watchedAtValidator,
rateValidator, async (req, res) => {
  const updatedUser = req.body;
  const data = JSON.parse(await readData());
  const oldUser = data.find((el) => +el.id === +req.params.id);
  updatedUser.id = oldUser.id;
  const newData = [...data.filter((el) => +el.id === +req.params.id), updatedUser];
  await fs.writeFile(talkerPath, JSON.stringify(newData));
  res.status(200).json(
    updatedUser,
  );
});

talkerRouter.delete('/:id', tokenValidator, async (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(await readData());
  const newData = data.filter((el) => +el.id !== +id);
  await fs.writeFile(talkerPath, JSON.stringify(newData));
  res.status(204).end();
});

module.exports = talkerRouter;