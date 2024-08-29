const { json } = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, '../data', 'users.json');


exports.readTask = async (req, res) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const users = JSON.parse(data);
        const userId = req.user.id;
        const user = users.find(user => user.id === userId);

        if (!user) return res.status(404).json({ message: 'User not found' });
        const tasks = user.tasks;
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



exports.writeTask = async (req, res) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const users = JSON.parse(data);
        const userId = req.user.id;
        const user = users.find(user => user.id === userId);

        if (!user) return res.status(404).json({ message: 'User not found' });

        user.tasks.push(req.body);

        await fs.writeFile(filePath, JSON.stringify(users, null, 2));
        return res.status(201).json(req.body);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


exports.deleteTask = async (req, res) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const users = JSON.parse(data);
        const userId = req.user.id;
        const user = users.find(user => user.id === userId);

        if (!user) return res.status(404).json({ message: 'User not found' });

        const taskId = parseInt(req.params.id, 10);
        const originalLength = user.tasks.length;
        user.tasks = user.tasks.filter(task => task.id !== taskId);

        if (user.tasks.length === originalLength) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await fs.writeFile(filePath, JSON.stringify(users, null, 2));
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




exports.updateTask = async (req, res) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const users = JSON.parse(data);
        const userId = req.user.id;
        const user = users.find(user => user.id === userId);

        if (!user) return res.status(404).json({ message: 'User not found' });

        const taskId = parseInt(req.params.id, 10);
        let taskFound = false;

        user.tasks = user.tasks.map(task => {
            if (task.id === taskId) {
                taskFound = true;
                if (req.body.title !== undefined) task.title = req.body.title;
                if (req.body.completed !== undefined) task.completed = req.body.completed;
            }
            return task;
        });

        if (!taskFound) return res.status(404).json({ message: 'Task not found' });

        await fs.writeFile(filePath, JSON.stringify(users, null, 2));
        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
