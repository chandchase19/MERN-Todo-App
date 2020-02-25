const mongoose = require('mongoose')

const TodoSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    todoId: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    msg: {
        type: String
    }, 
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('todo', TodoSchema)