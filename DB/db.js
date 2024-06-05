import {Sequelize} from 'sequelize'
const db=new Sequelize ('microservicio_pagos','root','',{
    host:'localhost',
    dialect:'mysql'
})

export default db