const express = require ("express");
const Datastore = require('nedb');
const app = express();

app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json('1Mb'));

const database = new Datastore('database.db');
database.loadDatabase();

app.post('/api', (request, response) => {
    console.log('I got a request!')
    console.log(request.body);
    const data = request.body;
    database.insert(data); //insère les données dans la bdd

    response.json({
        status : 'success',
        prenom : data.prenom,
        nom : data.nom,
        citation : data.citation,
    });
})
