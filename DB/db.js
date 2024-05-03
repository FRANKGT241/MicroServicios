import {Sequelize} from 'sequelize'
const db=new Sequelize ('pay_service','root','',{
    host:'localhost',
    dialect:'mysql'
})

export default db