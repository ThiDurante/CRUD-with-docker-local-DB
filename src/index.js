const express = require('express');
const loginRouter = require('./routers/loginRouter');
const talkerRouter = require('./routers/talkerRouter');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkerRouter);
app.use('/login', loginRouter);

app.listen(PORT, () => {
  console.log('Online');
});

// app.get('/talker', async (req, res) => {
//   const data = await readData();
//   res.status(200).json(JSON.parse(data) || []);
// });

// app.get('/talker/search', tokenValidator, async (req, res) => {
//   const data = JSON.parse(await readData());
//   if (!req.query.q) {
//     res.status(200).json(data);
//   } else {
//     console.log(data);
//     const resultArr = data.filter((el) => el.name.includes(req.query.q));
  
//     res.status(200).json(resultArr);
//   }
// });

// app.get('/talker/:id', async (req, res) => {
//   try {
//     const data = await readData();
//     const findId = JSON.parse(data)
//       .filter((el) => +el.id === +req.params.id)
//       .pop();
//     if (!findId) {
//       res.status(404).json({
//         message: 'Pessoa palestrante não encontrada',
//       });
//     }
//     res.status(200).json(findId);
//   } catch (err) {
//     res.status(400).json({
//       message: err,
//     });
//   }
// });

// app.post('/login', emailValidator, passwordValidator, (_req, res) => {
//   const token = generateToken();
//   res.status(200).json({
//     token,
//   });
// });

// app.post(
//   '/talker',
//   tokenValidator,
//   nameValidator,
//   ageValidator,
//   talkValidator,
//   watchedAtValidator,
//   rateValidator,
//   async (req, res) => {
//       const data = JSON.parse(await readData());
//       const newUser = req.body;
//       newUser.id = data[data.length - 1].id + 1;
//       const newData = [...data, newUser];
//       await fs.writeFile(talkerPath, JSON.stringify(newData));
//       res.status(201).json(
//         newUser,
// );
//   },
// );

// app.put('/talker/:id', 
// tokenValidator,
// nameValidator,
// ageValidator,
// talkValidator,
// watchedAtValidator,
// rateValidator, async (req, res) => {
//   const updatedUser = req.body;
//   const data = JSON.parse(await readData());
//   const oldUser = data.find((el) => +el.id === +req.params.id);
//   updatedUser.id = oldUser.id;
//   const newData = [...data.filter((el) => +el.id === +req.params.id), updatedUser];
//   await fs.writeFile(talkerPath, JSON.stringify(newData));
//   res.status(200).json(
//     updatedUser,
//   );
// });

// app.delete('/talker/:id', tokenValidator, async (req, res) => {
//   const { id } = req.params;
//   const data = JSON.parse(await readData());
//   const newData = data.filter((el) => +el.id !== +id);
//   await fs.writeFile(talkerPath, JSON.stringify(newData));
//   res.status(204).end();
// });
