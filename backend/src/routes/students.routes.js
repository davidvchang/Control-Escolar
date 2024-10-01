import { Router } from 'express';
import { getStudents, insertStudent, deleteStudent, updateStudent, getOneStudent } from "../controllers/students.controller.js";

const router = Router()

router.get('/', getStudents)
router.post('/', insertStudent)

router.get('/:num_control', getOneStudent)
router.delete('/:num_control', deleteStudent)
router.put('/:num_control', updateStudent)

export default router