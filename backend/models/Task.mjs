import mongoose from 'mongoose';
const TaskSchema=new mongoose.Schema({
    title:String,
    description:String,
    hour1:String,
    hour2:String,
})
const TaskModel=mongoose.model('Task',TaskSchema);
export default TaskModel;