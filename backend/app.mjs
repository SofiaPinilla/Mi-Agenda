import express from "express";
import mongoose from "mongoose";
import TaskModel from "./models/Task.mjs";
const app = express();

mongoose.connect('mongodb://localhost:27017/Tareas',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('conectado con éxito a mongodb'))
    .catch(error => console.error(error))

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.get('/task',async (req,res)=>{
    const tareas= await TaskModel.find({});
    res.send(tareas)
})
app.post('/task', (req, res) => {
    const task=new TaskModel(req.body)
    task.save();//lo mismo que en mysql INSERT 
    res.send(task) 
})
app.delete('/:id',async (req,res)=>{
    const tarea= await TaskModel.findByIdAndDelete(req.params.id);
    res.send(tarea)
})
app.listen(3001, () => console.log('servidor levantado en el puerto 3001'))