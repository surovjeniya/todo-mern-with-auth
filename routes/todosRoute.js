const {Router} = require('express')
const Todo = require('../models/Todo')

const router = Router()


router.get('/get-todo-list',async(req,res) => {
    try {

        const {userId} = req.query
        
        const todos = await Todo.find({
            owner:userId
        }) 

        res.status(200).json({
            todos
        })
    } catch(e) {
        res.status(500).json({
            message:"Todos not uploaded.Try again."
        })
    }
})


router.post('/add-todo',async (req,res) => {
    const {title,userId} = req.body
    try {
        const todo = new Todo({
            title,
            addedDate:String(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()),
            owner:userId
        })  
        await todo.save()

        res.status(201).json({
            message:"Todo added",
            title,userId
        })

    } catch(e) {
        res.status(500).json({
            message:"Todo not added.Try againt"
        })
    }
})

router.delete('/delete-todo/:id',async (req,res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message:"Todo deleted."
        })
    } catch(e) {
        res.status(500).json({
            message:"Todo not deleted.Try again"
        })
    }
})

router.put('/done-todo/:id',async (req,res) => {
    try  {
        const todo = await Todo.findById(req.params.id)
        await Todo.findByIdAndUpdate(req.params.id, {
            done: !todo.done
        })
        res.status(201).json({
            message:todo.done ? "Todo doned" : "Todo undoned"
        })
    } catch(e) {
        res.status(500).json({
            message:"Todo cant switch status.Try again"
        })
    }
})


router.put('/important-todo/:id',async (req,res) => {
    try  {
        const todo = await Todo.findById(req.params.id)
        await Todo.findByIdAndUpdate(req.params.id, {
            important: !todo.important
        })
        res.status(201).json({
            message:todo.important ? "Todo important" : "Todo unimportant"
        })
    } catch(e) {
        res.status(500).json({
            message:"Todo cant switch status.Try again"
        })
    }
})



module.exports = router;