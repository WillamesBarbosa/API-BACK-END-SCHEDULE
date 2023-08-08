require('dotenv').config();

const { Client } = require('pg');

let client;

// const createDatabase = async = async ()=>{
//   try {
//     await client.connect()

//     await client.end()

//   } catch (error) {
//     console.log('Erro ao conectar com o banco de dados', error)
//   }
// }

// createDatabase();
/* eslint-disable */

exports.query = async (query, values) => {
  try {
    if(!client){
      client = new Client({
        host: process.env.HOST,
        port: process.env.PORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
      });

      await client.connect()
    }
      const { rows } = await client.query(query, values);

      return rows;


  } catch (error) {
    console.log('Erro ao conectar com o banco de dados', error);
  }
};
