const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const {readdirSync} = require('fs');
require('dotenv').config();

//app
const app = express();

//db
const dbUrl = process.env.DATABASE || 'mongodb://127.0.0.1:27017/ecom';
const main = async () => {
    await mongoose.connect(dbUrl);
}

main()
.then(res => console.log('mongoose connected'))
.catch(err => console.log(err));

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

//routes middleware
readdirSync('./routes').map((r) =>
    app.use("/api", require('./routes/' + r))
);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,'../client/build')));

    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname,"..","client","build","index.html"));
    });
}

//port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on ${port}`));

