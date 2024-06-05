import {Sequelize} from 'sequelize'
const db=new Sequelize ('payment_service','root','',{
    host:'localhost',
    dialect:'mysql'
})

export default db