import {pool} from "../bd.js";


export const getStudents = async (req, res) => {
    try {
        const students = await pool.query('SELECT * FROM students')
        res.status(200).send(students.rows)
    } catch (ex) {
        console.log('Ha ocurrido un error al consultar a los estudiantes: ' + ex)
    }
}

export const getOneStudent = async (req, res) => {
    const {controlNumber} = req.params

    try {
        const ExistStudent = await pool.query('SELECT COUNT(*) AS Exist FROM students WHERE controlnumber = $1', [controlNumber])
        console.log(ExistStudent.rows[0].exist)
        if(ExistStudent.rows[0].exist > 0) {
            const students = await pool.query('SELECT * FROM students WHERE controlnumber = $1', [controlNumber])
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
    const {name, lastName, controlNumber, phoneNumber} = req.body

    try {
        await pool.query(`INSERT INTO students (name, lastname, controlnumber, phonenumber) Values ($1, $2, $3, $4)`, [name, lastName, controlNumber, phoneNumber])
        console.log('Alumno guardado correctamente')
        res.send('Alumno guardado correctamente')
    } catch (ex) {
        console.log('Ha ocurrido un error al guardar alumno: ' + ex)
    }
}

export const deleteStudent = async (req, res) => {
    const {controlNumber} = req.params

    try {
        const ExistStudent = await pool.query('SELECT COUNT(*) AS Exist FROM students WHERE controlnumber = $1', [controlNumber])
        console.log(ExistStudent.rows[0].exist)

        if(ExistStudent.rows[0].exist > 0) {
            await pool.query('DELETE FROM students WHERE controlnumber = $1', [controlNumber])
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
    const {name, lastName, phoneNumber} = req.body
    const {controlNumber} = req.params

    try {
        await pool.query('UPDATE students SET name = $1, lastname = $2, controlnumber = $4, phonenumber = $3 WHERE controlnumber = $4', [name, lastName, phoneNumber, controlNumber])
        res.status(204).json({ message: 'Alumno Actualizado correctamente'})
        console.log('Alumno Actualizado correctamente')
    } catch (ex) {
        console.log('Ha ocurrido un error al eliminar alumno: ' + ex)
        res.send('Ha ocurrido un error al eliminar alumno: ' + ex)
    }
}