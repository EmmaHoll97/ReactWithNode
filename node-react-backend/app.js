const express = require("express");
const cluster = require("cluster");
const compression = require('compression')
const os = require("os");
const bodyParser = require("body-parser");
const path = require('path');

/**
 * App setup
 */
const app = express();
app.use(compression());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(express.static(path.join(__dirname, 'static/build')));

/**
 * Routes
 */
app.get('/', (req, res) => {
  res.sendFile('/static/build/index.html');
});

app.get('/:reactRoute', (req, res) => {
    res.sendFile('/static/build/index.html');
});

app.get('/api/checkConnection', (req, res) => {
   res.status(200).send('connect');
});

/**
 * Node Cluster Configeration
 */
const NumCpu = os.cpus().length;
const port = process.env.PORT || 5000;
if (cluster.isMaster) {
    for (var i = 0; i < NumCpu; i++) {
        cluster.fork();
    }
    cluster.on("exit", (worker, code, singal) => {
        console.log("worker " + worker.process.pid + " died");
        cluster.fork();
    })
} else {
    app.listen(port, (error) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log(`Development server started on port ${port}`);
    });
}