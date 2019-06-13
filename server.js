const http = require('http');
const Joi = require('joi');
const express = require('express');

const app = express();
app.use(express.json());

const courses = [
    { id: 1, name: 'courses1' },
    { id: 2, name: 'courses2' },
    { id: 3, name: 'courses3' }
]

app.get('/', (req, res) => {
    res.send('hello sagar!!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('the course not found');
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    console.log(result);

    if (!res.body.name || req.body.name.lenght < 3) {
        res.status(400).send('name is not valid');
        return;
    }
    const course = {
        id: courses.lenght + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// const server = http.createServer((req, res) =>{
//     if (req.url === '/') { 
//         res.write('hello Sagar');
//         res.end();
//     }
//     if (res.url ==='/api/courses'){
//         res.write(JSON.stringify([1,2,3]));
//         res.end();
//     }
// });

const port = process.env.PORT || 3000;
app.listen(3000, () =>
    console.log(`server started on port  ${port}...export `));