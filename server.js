const Joi = require('joi');
const express = require('express');
const logger = require('./logger');
const helmet = require('helmet');
const config = require('config');
const courses= require('./routes/courses')
const home= require('./routes/home')

const app = express();
app.use('/api/courses', courses)
app.use('/', home);
app.set('view engine', 'pug');
app.set('views', './views')
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger);
app.use(helmet()); 


//congiguration 

console.log('Application Name:' + config.get('name'));
console.log('Application Name:' + config.get('mail.host'));
 




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));