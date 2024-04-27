const { MongoClient } = require('mongodb');

const url = '';
const client = new MongoClient(url);

async function connect() {
    console.log('connecting to mongoDB server ...');
    await client.connect();

    setTimeout(() => console.log('... connected to mongoDB server!'), 1000);
}

const dbName = 'users';

async function signUp({ fname, lname, email, password, age }) {
    if (!email || !password) return;

    await connect()
        .catch(console.error);

    const collection = client.db('users').collection('users');

    const insertResult = await collection.insertOne(
        { 
            'fname': fname, 
            'lname': lname, 
            'email': email, 
            'password': password, 
            'age': age 
        }
    );
    console.log('Inserted documents!');
    
    client.close();
    console.log('connection closed!')
}

async function logIn({ email, password }) {
    if (!email || !password) return;

    await connect()
        .then(() => console.log('... connected to mongoDB server!'))
        .catch(console.error);

    const collection = client.db('users').collection('users');

    const filter = { email, password };
    const projection = { _id: 0, fname: 1, lname: 1 };
    const findResult = collection.findOne(filter, { projection });

    client.close();
    console.log('connection closed!');

    return findResult;
}

module.exports = { signUp, logIn };
