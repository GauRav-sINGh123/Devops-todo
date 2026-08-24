import mongoose from 'mongoose';
import { Task } from '../models/task.model.js';

const isValidId = (id) => mongoose.isValidObjectId(id);

export const getTasks = async (req, res) => {
	const tasks = await Task.find().sort({ createdAt: -1 });
	res.status(200).json({ success: true, data: tasks });
};

export const getTask = async (req, res) => {
	if (!isValidId(req.params.id)) {
		return res.status(400).json({ success: false, message: 'Invalid task id' });
	}

	const task = await Task.findById(req.params.id);
	if (!task) {
		return res.status(404).json({ success: false, message: 'Task not found' });
	}

	res.status(200).json({ success: true, data: task });
};

export const createTask = async (req, res) => {
	const task = await Task.create(req.body);
	res.status(201).json({ success: true, data: task });
};

export const updateTask = async (req, res) => {
	if (!isValidId(req.params.id)) {
		return res.status(400).json({ success: false, message: 'Invalid task id' });
	}

	const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	});
	if (!task) {
		return res.status(404).json({ success: false, message: 'Task not found' });
	}

	res.status(200).json({ success: true, data: task });
};

export const deleteTask = async (req, res) => {
	if (!isValidId(req.params.id)) {
		return res.status(400).json({ success: false, message: 'Invalid task id' });
	}

	const task = await Task.findByIdAndDelete(req.params.id);
	if (!task) {
		return res.status(404).json({ success: false, message: 'Task not found' });
	}

	res.status(200).json({ success: true, message: 'Task deleted successfully' });
};
