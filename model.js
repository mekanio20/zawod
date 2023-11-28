const { DataTypes } = require('sequelize')
const database = require('./database')

const Login = database.define("logins", {
    id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, unique: true},
    email: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false}
}, { timestamps: false })

const Brick = database.define("bricks", {
    id: {type : DataTypes.INTEGER, allowNull : false, primaryKey : true, autoIncrement : true, unique : true},
    name: {type: DataTypes.STRING, allowNull: false},
    volume: {type: DataTypes.STRING, allowNull: false}, 
    b_time: {type: DataTypes.STRING, allowNull: false},
    e_time: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false}
}, { updatedAt: false })

module.exports = { Login, Brick }