const PostsCategories = (sequelize, _DataTypes) => {
  const postCategories = sequelize.define('PostsCategories', {}, { timestamps: false });

  postCategories.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categories, {
      as: 'categories',
      through: postCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.Categories.belongsToMany(models.BlogPosts, {
      as: 'blogposts',
      through: postCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return postCategories;
};

module.exports = PostsCategories;
