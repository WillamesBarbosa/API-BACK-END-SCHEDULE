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
        host: 'localhost',
        port: 5432,
        user: 'root',
        password: 'root',
        database: 'mycontacts',
      });

      await client.connect()
    }
      const { rows } = await client.query(query, values);

      return rows;


  } catch (error) {
    console.log('Erro ao conectar com o banco de dados', error);
  }
};
