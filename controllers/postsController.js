const { categoriesExist } = require('../services/categoriesService');
const { 
  validatePost, 
  findUser, 
  addPost, 
  addPostCategories, 
  getAllPosts,
  getPostById,
  findPostById,
  validatePut,
  validateUser,
  editPost,
  erasePost,
  findByQuery, 
} = require('../services/postsService');

const newPost = async (req, res, next) => {
  try {
    validatePost(req.body);
    const { title, content, categoryIds } = req.body;
    await categoriesExist(categoryIds);
    const { email } = req;
    const userId = await findUser(email);
    const id = await addPost(title, content, userId);
    await addPostCategories(id, categoryIds);

    const post = { id, userId, title, content };
    return res.status(201).json(post);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const listAllPosts = async (req, res, next) => {
  try {
    const result = await getAllPosts();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const listPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    await findPostById(id);
    const result = await getPostById(id);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const updatePostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email } = req;
    validatePut(req.body);
    await validateUser(id, email);
    const { title, content } = req.body;
    const result = await editPost(id, title, content);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const deletePostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email } = req;
    await validateUser(id, email);
    await erasePost(id);

    return res.status(204).json({});
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const listByQuery = async (req, res, next) => {
  try {
    const { q } = req.query;
    const result = await findByQuery(q);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = {
  newPost,
  listAllPosts,
  listPostById,
  updatePostById,
  deletePostById,
  listByQuery,
};
