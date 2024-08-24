import {pool} from "../bd.js";


export const getStudents = async (req, res) => {
    try {
        const students = await pool.query('SELECT * FROM estudiantes')
        res.status(200).send(students.rows)
    } catch (ex) {
        console.log('Ha ocurrido un error al consultar a los estudiantes: ' + ex)
    }
}

export const getOneStudent = async (req, res) => {
    const {num_control} = req.params

    try {
        const ExistStudent = await pool.query('SELECT COUNT(*) AS Exist FROM estudiantes WHERE num_control = $1', [num_control])
        console.log(ExistStudent.rows[0].exist)
        if(ExistStudent.rows[0].exist > 0) {
            const students = await pool.query('SELECT * FROM estudiantes WHERE num_control = $1', [num_control])
            console.log(students.rows)
            res.status(200).send(students.rows)
        }
        else {
            res.status(404).json({ message: "Alumno no encontrado" })
        }
    } catch (ex) {
        console.log('Ha ocurrido un error al consultar al estudiante: ' + ex)
    }
}

export const insertStudent = async (req, res) => {
    const {nombre, apellidos, num_control, numero_telefono, carrera, semestre, turno, correo} = req.body

    try {
        await pool.query(`INSERT INTO estudiantes (nombre, apellidos, num_control, numero_telefono, carrera, semestre, turno, correo) Values ($1, $2, $3, $4, $5, $6, $7, $8)`, [nombre, apellidos, num_control, numero_telefono, carrera, semestre, turno, correo])
        console.log('Alumno guardado correctamente')
        res.send('Alumno guardado correctamente')
    } catch (ex) {
        console.log('Ha ocurrido un error al guardar alumno: ' + ex)
    }
}

export const deleteStudent = async (req, res) => {
    const {num_control} = req.params

    try {
        const ExistStudent = await pool.query('SELECT COUNT(*) AS Exist FROM estudiantes WHERE num_control = $1', [num_control])
        console.log(ExistStudent.rows[0].exist)

        if(ExistStudent.rows[0].exist > 0) {
            await pool.query('DELETE FROM estudiantes WHERE num_control = $1', [num_control])
            res.status(204).json({ message: 'Alumno eliminado correctamente'})
            console.log('Alumno eliminado correctamente')
        }
        else {
            res.status(404).json({ message: "Alumno no encontrado" })
            console.log('Alumno no encontrado')
        }
    } catch (ex) {
        console.log('Ha ocurrido un error al eliminar alumno: ' + ex)
        res.send('Ha ocurrido un error al eliminar alumno: ' + ex)
    }
}

export const updateStudent = async (req, res) => {
    const {nombre, apellidos, numero_telefono, carrera, semestre, turno, correo} = req.body
    const {num_control} = req.params

    try {
        await pool.query('UPDATE estudiantes SET nombre = $1, apellidos = $2, numero_telefono = $3, carrera = $4, semestre = $5, turno = $6, correo = $7 WHERE num_control = $8', [nombre, apellidos, numero_telefono, carrera, semestre, turno, correo])
        res.status(204).json({ message: 'Alumno Actualizado correctamente'})
        console.log('Alumno Actualizado correctamente')
    } catch (ex) {
        console.log('Ha ocurrido un error al eliminar alumno: ' + ex)
        res.send('Ha ocurrido un error al eliminar alumno: ' + ex)
    }
}