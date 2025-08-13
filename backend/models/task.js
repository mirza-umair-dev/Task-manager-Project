import mongoose, { Mongoose, Schema } from 'mongoose'
const TodoSchema = new mongoose.Schema({
    text:{type:String,required:true},
    completed:{type:Boolean,default:false}
});
const TaskSchema = new mongoose.Schema({
    title : {type:String,required:true},
    assignedTo: [{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    description:{type:String},
    status: {type:String ,enum:['pending','in-progress','completed'], default:'pending'},
    priority:{type:String,enum:['low','medium','high'],default:'low'},
    duedate:{type:Date,required:true},
    progress:{type:Number,default:0},
    todoChecklist:[TodoSchema],
    attachments:[String]
},
{timestamps:true}
);

const Task = mongoose.model('Task',TaskSchema);
export default Task;