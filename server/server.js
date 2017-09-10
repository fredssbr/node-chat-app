const path = require('path');
const express = require('express');

const app = express();
const publicPath = path.join(__dirname, '../public');

var port = process.env.port || 3000;

app.use(express.static(publicPath));

/**
 * To reach the public folder, this way would enter the server folder 
 * (since __dirname is the directory of the file we use it) and then 
 * come out of it
 */
console.log(__dirname + '/../public');

/**
 * PATH normalizes it
 */
console.log(publicPath);

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});