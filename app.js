require('marko/node-require').install();
var markoExpress = require('marko/express');
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

var indexTemplate = require('./index.marko');

app.use(markoExpress());
app.get('/', (req, res) => res.sendFile(path.join(__dirname +'/index.html')));
// app.get('/', (req, res) => res.marko(indexTemplate, {refreshURL: "${process.env.BROWSER_REFRESH_URL}"}));
app.get('/main.css', (req, res) => res.sendFile(path.join(__dirname+'/main.css')));
app.get('/index.js', (req, res) => res.sendFile(path.join(__dirname+'/index.js')));

app.use("/images", express.static(path.join(__dirname + '/images')));
app.use("/resp1", express.static(path.join(__dirname + '/resp1')));

app.listen(port, () => {console.log(`Example app listening on port ${port}!`);

	if (process.send) {
        process.send({ event:'online', url:`http://localhost:${port}/` });
        console.log("Refresh URL is " + process.env.BROWSER_REFRESH_URL);

    }
});