const express = require('express')
const { signUp, logIn } = require('./login.js')

const app = express()
const PORT = 8080
const successHTML = `
    <html>
        <head>
            <link rel="stylesheet" href="styles.css"/>
            <title>login successful</title>
        </head>
        <body>
            <div id="login-success">
                <p>login successful for user: fname lname</p>
            </div>
        </body>
    </html>
`;
const failedHTML = `
    <html>
    <head>
        <link rel="stylesheet" href="styles.css"/>
        <title>login failed</title>
    </head>
    <body>
        <div id="login-failed">
            <p>login failed!</p>
        </div>
    </body>
    </html>
`;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.get('/', (_, response) => {
    response.sendFile(`${__dirname}/index.html`)
})

app.post('/login', async (request, response) => {
    const user = await logIn(request.body);
    if (!!user) {
        response.send(
            successHTML
                .replace('/fname/g', user.fname)
                .replace('/lname/g', user.lname)
        );
    } else {
        response.send(
            failedHTML
        );
    }
})

app.post('/signup', async (request, response) => {
    await signUp(request.body);
    response.sendFile(__dirname + '/public/login.html');
})

app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`)
})