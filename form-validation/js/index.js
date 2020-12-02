const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3002;

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);


server.listen(port, () => {
    console.log('JSON Server is running')
   })

// server.get('/users', (request, response) => {
//     if (request.method === 'GET') {
//         const users = require('../users/index');
//         response.status(200).jsonp(users());
//     }
// })

server.get('/form', (request, response) => {
    if (request.method === 'GET') {
        console.log(
            `${request.query.username}\n${request.query.email}\n${request.query.address}\n${request.query.phone}\n${request.query.dob}`
        );
        response.json({status: 'success'});
    }
})

server.post('/formjs', (request, response) => {
    if (request.method === 'POST') {
        console.log(
            `${request.body.username}\n${request.body.emailAddress}\n${request.body.address}\n${request.body.phone}\n${request.body.dob}`
        );
        response.json({status: 'success'});
    }
})