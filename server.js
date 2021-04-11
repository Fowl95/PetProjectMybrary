if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const path = require('path');

const indexRouter = require('./routes/index')

app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.set('views', __dirname + '\\views')
app.set('layout', 'layouts/layouts')
app.use(expressLayouts)
app.use(express.static(path.join(__dirname, 'public')));

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
// you don't want to hard code your connection but be dependent on your environment
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))


app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)