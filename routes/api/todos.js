const express = require('express')
const router = express.Router()
const uuid = require('uuid')

const Todo = require('../../models/Todo')

//get all todos by user id
router.post('/all', async (req, res) => {
    const { userId }  = req.body

    console.log(req)

    try {
        const todos = await Todo.find({userId}).sort({date: -1})

        res.json(todos)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }

})

//delete a todo with id
router.post('/remove', async (req, res) => {
    const { todoId }  = req.body

    console.log(req.body)

    try {
        console.log(req.body)
        const todo = await Todo.findOne({todoId})

        todo.remove()
        
        res.json(todo)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }

})

//update todo document
router.post('/update', async (req, res) => {
    const { todoId, todoTitle, todoMsg }  = req.body


    console.log('hu',req.body)

    try {
        console.log(todoId)
        const todo = await Todo.findOne({todoId})

        todo.title = todoTitle
        todo.msg = todoMsg

        console.log(todo)

        todo.save()

        res.json(todo)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }

})

//add todo to database
router.post('/', async (req, res) => {
    const { title, msg, userId } = req.body
    const todoId = uuid.v4()

    try {
        const newTodo = new Todo({
            userId,
            title,
            msg,
            todoId
        })

        const todo = await newTodo.save()

        res.json(todo)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})

module.exports = router