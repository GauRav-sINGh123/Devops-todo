import { Types } from 'mongoose';
import { Task } from '../models/task.model.js';

const isValidId = (id) => Types.ObjectId.isValid(id);

const sendSuccess = (res, statusCode, data, message = 'Success') => {
	return res.status(statusCode).json({
		success: true,
		message,
		data
	});
};

const sendError = (res, statusCode, message) => {
	return res.status(statusCode).json({
		success: false,
		message
	});
};
 
export const getTasks = async (req, res, next) => {
	try {
		const tasks = await Task.find()
			.sort({ createdAt: -1 })
			.lean();

		return sendSuccess(res, 200, tasks);
	} catch (error) {
		return next(error);
	}
};

 
export const getTask = async (req, res, next) => {
	const { id } = req.params;

	if (!isValidId(id)) {
		return sendError(res, 400, 'Invalid task id');
	}

	try {
		const task = await Task.findById(id).lean();

		if (!task) {
			return sendError(res, 404, 'Task not found');
		}

		return sendSuccess(res, 200, task);
	} catch (error) {
		return next(error);
	}
};

 
export const createTask = async (req, res, next) => {
	try {
		const task = await Task.create(req.body);

		return sendSuccess(
			res,
			201,
			task,
			'Task created successfully'
		);
	} catch (error) {
		return next(error);
	}
};

 
export const updateTask = async (req, res, next) => {
	const { id } = req.params;

	if (!isValidId(id)) {
		return sendError(res, 400, 'Invalid task id');
	}

	try {
		const task = await Task.findByIdAndUpdate(
			id,
			req.body,
			{
				new: true,
				runValidators: true
			}
		).lean();

		if (!task) {
			return sendError(res, 404, 'Task not found');
		}

		return sendSuccess(
			res,
			200,
			task,
			'Task updated successfully'
		);
	} catch (error) {
		return next(error);
	}
};
 
export const deleteTask = async (req, res, next) => {
	const { id } = req.params;

	if (!isValidId(id)) {
		return sendError(res, 400, 'Invalid task id');
	}

	try {
		const task = await Task.findByIdAndDelete(id);

		if (!task) {
			return sendError(res, 404, 'Task not found');
		}

		return sendSuccess(
			res,
			200,
			null,
			'Task deleted successfully'
		);
	} catch (error) {
		return next(error);
	}
};