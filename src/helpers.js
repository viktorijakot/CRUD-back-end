const mysql = require('mysql2/promise');
const { dbConfig } = require('./config');


async function executeQuery(sql, arguments = []){
    let connection;

    try {
        connection = await mysql.createConnection(dbConfig)

    const [rows] = await connection.execute(sql, arguments);

    return [rows, null]
    } catch (error) {
        console.log('error in connection mysql ===', error);
        return [null, error]
    } finally {
        if(connection){
            connection.end()
        }
    }
    
}
module.exports = {
    executeQuery
}