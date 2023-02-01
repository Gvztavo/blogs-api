const Login = (sequelize, DataTypes) => {
  const login = sequelize.define('Login', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  return login;
};

module.exports = Login;