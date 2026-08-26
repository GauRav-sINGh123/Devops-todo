import express from "express";
import {
	createTask,
	deleteTask,
	getTask,
	getTasks,
	updateTask
} from '../controllers/task.controller.js';

const router=express.Router();

router.route('/').get(getTasks);
router.route('/').post(createTask);
router.route('/:id').get(getTask);
router.route('/:id').put(updateTask);
router.route('/:id').delete(deleteTask);
	

export default router;
