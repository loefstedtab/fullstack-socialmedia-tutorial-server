const Sequelize = require('sequelize')
const db = require('./db')


const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true
  },
  first_Name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  last_Name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  google_id:{
    type:Sequelize.STRING,
    allowNull: true
  }
})

module.exports = User
