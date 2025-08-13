import User from "../models/user.js"
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
import Task from "../models/task.js";
dotenv.config();
export const getUsers = async (req,res) => {
    const users = await User.find();
    res.status(200).json({
        users
    })
}

export const getTeamMembers = async (req, res) => {
    try {
        const myId = req.user._id;

        const tasks = await Task.find({ createdBy: myId })
            .populate('assignedTo', 'name email profileImgUrl role');

        const userTasks = {};

        tasks.forEach(task => {
            task.assignedTo.forEach(user => {
                if (!userTasks[user._id]) {
                    userTasks[user._id] = {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        profileImgUrl: user.profileImgUrl,
                        role: user.role,
                        taskCount: 0,
                        pending: 0,
                        completed: 0,
                        inProgress: 0
                    };
                }
                userTasks[user._id].taskCount++;
                
                // Count by status
                if (task.status === 'pending') {
                    userTasks[user._id].pending++;
                } else if (task.status === 'completed') {
                    userTasks[user._id].completed++;
                } else if (task.status === 'in-progress') {
                    userTasks[user._id].inProgress++;
                }
            });
        });

        const teamMembers = Object.values(userTasks);
        res.status(200).json({ success: true, teamMembers });

    } catch (error) {
        console.error("Error in getTeamMembers:", error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


export const getUserById = async (req,res) => {
    const {id} = req.params;
    try {
        const user = await User.findById(id);

        res.status(200).json({
            user
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Internal Server Error'})
    }
}

export const deleteUser = async (req,res) => {
    const {id} = req.params;
    try {
        const user = await User.findById(id);
        if(!user){
           return res.status(404).json({message:'Invalid User id'})
        }
        await user.deleteOne();
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
       return res.status(500).json({message:'Internal server error'})
    }
}

export const updateUser = async (req,res) => {
    const {id} = req.params;
    const {name,email,password,adminInviteToken} = req.body;
    let role;
    try {
        const user = await User.findById(id);
        if(!user){
           return res.status(404).json({message:'Invalid User id'})
        }
        if(name)user.name = name;
        if(email)user.email = email;
        if(password){
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }
        if(adminInviteToken && adminInviteToken === process.env.ADMIN_INVITE_TOKEN){
            user.role = 'admin';
        } 
        const updatedUser = await user.save();
        return res.status(200).json({ 
            _id : updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            role:updatedUser.role
        });
    } catch (error) {
        console.error(error);
       return res.status(500).json({message:'Internal server error'})
    }
}

