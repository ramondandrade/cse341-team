const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();
const PORT = process.env.PORT || 8080;

const doc = {
    info: {
        title: 'RR-Character-Manager ',
        description: 'CSE 341 Final project - RR-Character-Manager',
        author: 'Ryndee van Langeveld, Ramon Andrade'
    },
    host: process.env.NODE_ENV==='production'?'cse341-team-2g6z.onrender.com': 'localhost:'+PORT,
    schemes: process.env.NODE_ENV==='production'? ['https'] : ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);