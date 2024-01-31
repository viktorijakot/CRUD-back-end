const mysql = require("mysql2/promise");
const { dbConfig, jwtSecret } = require("./config");
const jwt = require('jsonwebtoken');
const { json } = require("express");

async function executeQuery(sql, arguments = []) {
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(sql, arguments);

    return [rows, null];
  } catch (error) {
    console.log("error in connection mysql ===", error);
    return [null, error];
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

function signJwtToken (data, expires = '1h') {
if(!jwtSecret)throw new Error ('JWR Secret not provided')

return jwt.sign(data, jwtSecret, {expiresIn: expires})
}

function parseJwtToken(token){
return JSON.parse(Buffer.from(token.split('.')[1], 'base64'))
}

module.exports = {
  executeQuery,
  signJwtToken,
  parseJwtToken
};
