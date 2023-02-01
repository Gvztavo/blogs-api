const Users = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true, 
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  { timestamps: false });

  User.associate = (models) => {
    User.hasOne(models.BlogPosts, { as: 'blogposts', foreignKey: 'id' });
   };

  return User;
};

module.exports = Users;
