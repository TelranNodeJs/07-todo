import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
const bd = []
let counter = 0

// ADD TASK
app.post('/todo', (req, res) => {
    const {title, description} = req.body;
    const todo = {
        id: counter++,
        // ...req.body,
        title: title,
        description: description,
    }
    bd.push(todo);
    res.type('text/plain; charset=UTF-8')
        // .status(200)
        .send("OK")
})

// READ TASK
app.get("/todos", (req, res) => {
    res.json(bd)
})

app.get("/todo", (req, res) => {
    const id = req.query.id;
    const result = bd.find(t => t.id === +id)
    if (!result) {
        return res.status(404)
            .type("text/plain; charset=utf-8")
            .send(`Task with ID ${id} does not exist`)
    }
    res.json(result)
})

app.get("/todo/:id", (req, res) => {
    const id = req.params.id;
    const result = bd.find(t => t.id === +id)
    if (!result) {
        return res.status(404)
            .type("text/plain; charset=utf-8")
            .send(`Task with ID ${id} does not exist`)
    }
    res.json(result)
})

// UPDATE TASK
app.put("/todo", (req, res) => {
    const {id, title, description} = req.body
    const todo = bd.find(t => t.id === +id)
    if (!todo) {
        return res.status(404)
            .type("text/plain; charset=utf-8")
            .send(`Task with ID ${id} does not exist`)
    }
    todo.title = title
    todo.description = description
    res.json(todo)
})


// DELETE TASK
app.delete("/todo", (req, res) => {
    const id = req.query.id;
    const index = bd.findIndex(t => t.id === +id)
    if (index < 0) {
        return res.status(404)
            .type("text/plain; charset=utf-8")
            .send(`Task with ID ${id} does not exist`)
    }
    const todo = bd[index]
    bd.splice(index,1)
    return res.json(todo)

})

app.delete("/todo/:id", (req, res) => {
    const id = req.params.id;
    const index = bd.findIndex(t => t.id === +id)
    if (index < 0) {
        return res.status(404)
            .type("text/plain; charset=utf-8")
            .send(`Task with ID ${id} does not exist`)
    }
    const todo = bd[index]
    bd.splice(index,1)
    return res.json(todo)
})


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})