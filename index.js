const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const { PostsCategories } = require('./models');
const categoriesRouter = require('./routes/categoriesRouter');
const loginsRouter = require('./routes/loginsRouter');
const postsRouter = require('./routes/postsRouter');
const usersRouter = require('./routes/usersRouter');

const app = express();

app.use(express.json());

app.use('/user', usersRouter);

app.use('/login', loginsRouter);

app.use('/categories', categoriesRouter);

app.use('/post', postsRouter);

app.get('/postcategories', async (req, res) => {
  const result = await PostsCategories.findAll();

  return res.status(200).json(result);
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(errorHandler);