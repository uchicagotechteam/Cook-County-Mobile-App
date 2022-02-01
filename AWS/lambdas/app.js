var lambda = require('./index');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: path.resolve(__dirname, '../lambdas/.env')});
lambda.handler();