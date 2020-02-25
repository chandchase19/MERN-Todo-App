const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const db = config.get('mongoURI')
const app = express()

try {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })

    console.log('Mongodb connected')
} catch(err) {
    console.error(err.message)

    process.exit(1)
}

app.use(express.json({extended: false}))

app.get('/', (req, res) => res.send('api running'))

app.use('/api/users', require('./routes/api/users'))
app.use('/api/todos', require('./routes/api/todos'))


const PORT = process.env.PORT || 5075

app.listen(PORT, () => console.log('server started on port ' + PORT))