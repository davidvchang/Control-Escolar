import {pool} from "../bd.js";

export const getTeachers = async (req, res) => {
    try {
        const teachers = await pool.query('SELECT * FROM profesores')
        res.status(200).send(teachers.rows)
    } catch (ex) {
        console.log('Ha ocurrido un error al consultar a los profesores: ' + ex)
    }
}

export const getOneTeacher = async (req, res) => {
    const {clave} = req.params

    try {
        const existTeacher = await pool.query('SELECT COUNT(*) AS Exist FROM profesores WHERE clave = $1', [clave])
        if(existTeacher.row[0].exist > 0) {
            const teacher = await pool.query('SELECT * FROM profesores WHERE clave = $1', [clave])
            res.status(200).send(teacher.rows)
        }
        else {
            res.status(404).json({ message: "Profesor no encontrado" })
        }
    } catch (ex) {
        console.log('Ha ocurrido un error al consultar al profesor: ' + ex)
    }
}

export const insertTeacher = async (req, res) => {
    const {nombre, apellidos, clave, telefono, correo} = req.body

    try {
        await pool.query('INSERT INTO profesores (nombre, apellidos, clave, telefono, correo) VALUES ($1, $2, $3, $4, $5)', [nombre, apellidos, clave, telefono, correo])
        res.send('Profesor guardado correctamente')
        
    } catch (ex) {
        console.log('Ha ocurrido un error al guardar profesor: ' + ex)
    }
}

export const deleteTeacher = async (req, res) => {
    const {clave} = req.params

    try {
        const existTeacher = await pool.query('SELECT COUNT(*) AS Exist FROM profesores WHERE clave = $1', [clave])
        if(existTeacher.rows[0].exist > 0) {
            const teacher = await pool.query('DELETE FROM profesores WHERE clave = $1', [clave])
            res.status(200).send(teacher.rows)
        }
        else {
            res.status(404).json({ message: "Profesor no encontrado" })
        }
    } catch (ex) {
        console.log('Ha ocurrido un error al consultar al profesor: ' + ex)
    }
}

export const updateTeacher = async (req, res) => {
    const {nombre, apellidos, clave, telefono, correo} = req.body
    const {claveParam} = req.params

    try {
        await pool.query('UPDATE profesores SET nombre = $1, apellidos = $2, clave = $3, telefono = $4, correo = $5 WHERE num_control = $6', [nombre, apellidos, clave, telefono, correo, claveParam])
        res.status(200).json({ message: 'Profesor Actualizado correctamente'})
    } catch (ex) {
        res.status(500).json({ message: 'Ha ocurrido un error al actualizar profesor', error: ex.message });
    }
}