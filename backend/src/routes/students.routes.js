import { Router } from 'express';
import { getStudents, insertStudent, deleteStudent, updateStudent, getOneStudent } from "../controllers/students.controller.js";

const router = Router()

router.get('/', getStudents)
router.post('/', insertStudent)

router.get('/:controlNumber', getOneStudent)
router.delete('/:controlNumber', deleteStudent)
router.put('/:controlNumber', updateStudent)

export default router