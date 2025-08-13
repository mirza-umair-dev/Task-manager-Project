import Task from "../models/task.js"
import User from "../models/user.js";
export const createTask = async (req, res) => {
    try {
        const newTask = await Task.create({
            ...req.body,
            createdBy: req.user._id,
             assignedTo: req.body.assignedTo || null
        });
        res.status(201).json(newTask)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' })
    }

}


export const getTasks = async (req, res) => {
    let tasks;
    try {
        tasks = await Task.find({
            $or: [{ createdBy: req.user._id },
            { assignedTo: req.user._id }
            ]
        })
            .populate('assignedTo', 'name email')
            .populate('createdBy', 'name email');

        //      tasks = tasks.map(task => {
        //     if (task.todoChecklist && task.todoChecklist.length > 0) {
        //         const completedCount = task.todoChecklist.filter(todo => todo.completed).length;
        //         const totalCount = task.todoChecklist.length;
        //         const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

        //         task.progress = progress;

        //         if (progress === 100) {
        //             task.status = 'completed';
        //         } else if (progress > 0) {
        //             task.status = 'in-progress';
        //         } else {
        //             task.status = 'pending';
        //         }
        //     }
        //     return task;
        // });
        
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' })
    }

}
export const getTaskDetailsById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id)
            .populate('assignedTo', 'name email')
            .populate('createdBy', 'name email');
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        // if (task.createdBy.toString() !== req.user._id.toString() &&
        //     task.assignedTo?.toString() !== req.user._id.toString()) {
        //     return res.status(403).json({ message: 'Not authorized to view this task' });
        // }
        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export const updateTask = async (req, res) => {

    const { id } = req.params;

    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if (task.createdBy.toString() !== req.user._id.toString() &&
            task.assignedTo?.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this task' });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        )
            .populate('assignedTo', 'name email')
            .populate('createdBy', 'name email');

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json(updatedTask)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export const deleteTask = async (req, res) => {

    const { id } = req.params;

    try {
        const task = await Task.findById(id);

        if (!task) {
           return res.status(404).json({ message: 'User not found' });
        }
        if (
            task.createdBy.toString() !== req.user._id.toString() &&
            task.assignedTo?.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({ message: "Not authorized to delete this task" });
        }
        await task.deleteOne();

        res.status(200).json({ message: 'task deleted successfully' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const updateChecklist = async (req, res) => {
    const { id } = req.params;
    const { todoChecklist } = req.body;

    try {
        const task = await Task.findById(id);

        if (!task) {
            res.status(404).json({ message: 'User not found' });
        }
        // if (
        //     task.createdBy.toString() !== req.user._id.toString() &&
        //     task.assignedTo?.toString() !== req.user._id.toString()
        // ) {
        //     return res.status(403).json({ message: "Not authorized to update checklist" });
        // }

        task.todoChecklist = todoChecklist;

        const completedCount = todoChecklist.filter(todo => todo.completed).length;
        const totalCount = todoChecklist.length;
        task.progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

        if (task.progress === 100) {
            task.status = 'completed';
        } else if (task.progress > 0) {
            task.status = 'in-progress'
        } else {
            task.status = 'pending'
        }

        await task.save();

        res.status(200).json(task);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Intternal server error' })
    }

}

export const getUserDashboard = async (req, res) => {
    try {
        const userId = req.user._id;

        const createdCount = await Task.countDocuments({ createdBy: userId });
        const assignedCount = await Task.countDocuments({ assignedTo: { $in: [userId] } });

        const completedCount = await Task.countDocuments({
            $or: [{ createdBy: userId }, { assignedTo: { $in: [userId] } }],
            status: 'completed',
        });

        const pendingCount = await Task.countDocuments({
            $or: [{ createdBy: userId }, { assignedTo: { $in: [userId] } }],
            status: 'pending',
        });

        const inProgressCount = await Task.countDocuments({
            $or: [{ createdBy: userId }, { assignedTo: { $in: [userId] } }],
            status: 'in-progress',
        });

        const statusChart = await Task.aggregate([
            {
                $match: {
                    $or: [{ createdBy: userId }, { assignedTo: { $in: [userId] } }],
                },
            },
            { $group: { _id: '$status', count: { $sum: 1 } } },
        ]);
        const priorityChart = await Task.aggregate([
            {
                $match: {
                    $or: [{ createdBy: userId }, { assignedTo: { $in: [userId] } }],
                },
            },
            { $group: { _id: '$priority', count: { $sum: 1 } } },
        ]);

        res.status(200).json({
            user: {
                name: req.user.name,
                email: req.user.email,
                role: req.user.role,
                profileImg: req.user.profileImg,
            },
            stats: {
                createdCount,
                assignedCount,
                completedCount,
                pendingCount,
                inProgressCount,
            },
            charts: {
                statusChart,
                priorityChart
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const getAdminDashboard = async (req, res) => {
    try {
        const adminId = req.user._id;

        const totalUsers = await User.countDocuments({ _id: { $ne: adminId } });


        const assignedTasks = await Task.countDocuments({
            assignedTo: { $ne: adminId },
             createdBy: adminId }
        );
        const selfTasks = await Task.countDocuments(
            { createdBy: adminId ,
             assignedTo: adminId || null}
        );
        const totalTasks = await Task.countDocuments({ createdBy: adminId });
        
        const completedTasks = await Task.countDocuments(
            {
                createdBy: adminId,
                status: 'completed'
            },
        );

        const pendingTasks = await Task.countDocuments({
            createdBy: adminId,
            status: 'pending',
        });
        const inProgressTasks = await Task.countDocuments({
            createdBy: adminId,
            status: 'in-progress',
        });

        const statusChart = await Task.aggregate([
            { $match: { createdBy: adminId } },
            { $group: { _id: '$status', count: { $sum: 1 } } },
        ]);

        const priorityChart = await Task.aggregate([
            { $match: { createdBy: adminId } },
            { $group: { _id: '$priority', count: { $sum: 1 } } },
        ]);

        const dailyChart = await Task.aggregate([
            { $match: { createdBy: adminId } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        res.status(200).json({
            admin: {
                name: req.user.name,
                email: req.user.email,
                profileImg: req.user.profileImg,
            },
            stats: {
                totalUsers,
                totalTasks,
                assignedTasks,
                selfTasks,
                completedTasks,
                pendingTasks,
                inProgressTasks
            },
            charts: {
                statusChart,
                priorityChart,
                dailyChart,
            },
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error loading admin dashboard' });
    }
}
export const updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'in-progress', 'completed'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    try {
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        
        if (
            task.createdBy.toString() !== req.user._id.toString() &&
            task.assignedTo?.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({ message: 'Not authorized to update this task' });
        }

        task.status = status;

        // Optional: sync checklist progress based on status
        if (status === 'completed') {
            if (task.todoChecklist && task.todoChecklist.length > 0) {
                task.todoChecklist = task.todoChecklist.map(todo => ({
                    ...todo,
                    completed: true
                }));
                task.progress = 100;
            }
        } else if (status === 'pending') {
            task.progress = 0;
        }
        

        await task.save();

        const populatedTask = await Task.findById(task._id)
            .populate('assignedTo', 'name email')
            .populate('createdBy', 'name email');

        return res.status(200).json(populatedTask);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
