const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    description: String,
    complete: Boolean
})

const Todo = mongoose.model('Todo', todoSchema)


module.exports = Todo