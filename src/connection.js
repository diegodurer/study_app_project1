const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("db_study_app", 'postgres', 'root', {
    host : 'localhost',
    port : 5432,
    dialect : 'postgres'
});

const testConnection = function() {
    try {
        sequelize.authenticate();
        console.log("Conectado con Exito!!!");
    } catch (error) {
        console.log("Error de conexion", error);
    }
}

testConnection();

module.exports = {
    Sequelize,
    sequelize
}