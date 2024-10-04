import { Router } from "express";
import { getTeachers, getOneTeacher, insertTeacher, deleteTeacher, updateTeacher } from "../controllers/teachers.controller.js";

const router = Router()

router.get('/', getTeachers)
router.post('/', insertTeacher )

router.get('/:clave', getOneTeacher)
router.delete('/:clave', deleteTeacher)
router.put('/:clave', updateTeacher)

export default router