import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Task title is required'],
			trim: true,
			minlength: [1, 'Task title cannot be empty']
		},
		category: {
			type: String,
			trim: true,
			default: 'Personal',
		},
		due: {
			type: String,
			trim: true,
			default: 'Today'
		},
		completed: {
			type: Boolean,
			default: false
		}
	},
	{ timestamps: true }
);

export const Task = mongoose.model('Task', taskSchema);
