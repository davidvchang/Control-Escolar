import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';

function AddStudent({ closeModal, num_control }) {

    const initialValue = {
        nombre: '',
        apellidos: '',
        num_control: '',
        numero_telefono: '',
        carrera: '',
        semestre: '',
        turno: '',
        correo: '',
    }

    const [dataStudent, setDataStudent] = useState(initialValue);

    //Hacer una pedicion a la API
    useEffect(() => {
        if(num_control) {
            getOneStudent(num_control)
            window.history.pushState(null, '', `/${num_control}`);
        }
        else {
            setDataStudent(initialValue); // Reiniciar el formulario si no hay num_control
        }
    }, [num_control])

    const getOneStudent = async (num_control) => {
        try {
            const response  = await axios.get(`http://localhost:4000/api/estudiantes/${num_control}`)
            const dataStudent = response.data;
            console.log("datos: ", dataStudent)
            setDataStudent({
                nombre: dataStudent.nombre,
                apellidos: dataStudent.apellidos,
                num_control: dataStudent.num_control,
                numero_telefono: dataStudent.numero_telefono,
                carrera: dataStudent.carrera,
                semestre: dataStudent.semestre,
                turno: dataStudent.turno,
                correo: dataStudent.correo
            })


            
        } catch (ex) {
            console.error('Error fetching student:', ex);
            setMessage('Error al obtener el estudiante');
        }
      }

    const captureData = (e) => {
        const {name, value} = e.target
        setDataStudent({...dataStudent, [name]: value})
      }

    const saveOrUpdateStudent = async (e) => {
        e.preventDefault(); //Se usa para que no recargue la página al enviar

        try {

            if(num_control) {
                // Actualizar estudiante
                await axios.put(`http://localhost:4000/api/estudiantes/${num_control}`, dataStudent);
                Swal.fire({
                    title: 'Éxito',
                    text: 'Alumno actualizado correctamente',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            }

            else {

                //Guardar datos en el backend
                const newStudent = {
                    nombre: dataStudent.nombre,
                    apellidos: dataStudent.apellidos,
                    num_control: dataStudent.num_control,
                    numero_telefono: dataStudent.numero_telefono,
                    carrera: dataStudent.carrera,
                    semestre: dataStudent.semestre,
                    turno: dataStudent.turno,
                    correo: dataStudent.correo
                }
            
                await axios.post('http://localhost:4000/api/estudiantes', newStudent)
            
                Swal.fire({
                    title: 'Éxito',
                    text: 'Alumno guardado correctamente',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    closeModal(); // Cerrar el modal
                    setDataStudent({ ...initialValue }); // Reiniciar el formulario
                });
            }
        } catch (ex) {
            Swal.fire({
                title: 'Error',
                text: 'Ha ocurrido un error al guardar el alumno',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
        setDataStudent({...initialValue})
    }

  return (
    <>
    
        <div className="modal-overlay" onClick={closeModal}></div>
        <div className='addStudent'>
            <h2>{num_control ? 'Actualizar Estudiante' : 'Agregar Estudiante'}</h2>

            <form className='addStudentForm' onSubmit={saveOrUpdateStudent}>
                <div className='formRow'>
                    <div className='formGroup'>
                        <label>Nombre:</label>
                        <input type="text" name="nombre" placeholder='Nombre' value={dataStudent.nombre} onChange={captureData} required/>
                    </div>

                    <div className='formGroup'>
                        <label>Apellidos:</label>
                        <input type="text" name="apellidos" placeholder='Apellidos' value={dataStudent.apellidos} onChange={captureData} required/>
                    </div>
                </div>

                <div className='formRow'>
                    <div className='formGroup'>
                        <label>Número de control:</label>
                        <input type="number" name="num_control" placeholder='Número de control' value={dataStudent.num_control} onChange={captureData} required/>
                    </div>

                    <div className='formGroup'>
                        <label>Número de teléfono:</label>
                        <input type="number" name="numero_telefono" placeholder='Número de teléfono' value={dataStudent.numero_telefono} onChange={captureData} required/>
                    </div>
                </div>

                <div className='formRow'>
                    <div className='formGroup'>
                        <label>Carrera:</label>
                        <select name="carrera" value={dataStudent.carrera} onChange={captureData} required>
                            <option value="">Seleccionar carrera</option>
                            <hr />
                            <option value="ingenieria en sistemas computacionales">Ingeniería en Sistemas Computacionales</option>
                            <option value="ingenieria industrial">Ingeniería Industrial</option>
                            <option value="ingenieria en gestion empresarial"> Ingeniería en Gestión Empresarial</option>
                            <option value="ingenieria mecatronica">Ingeniería Mecatrónica</option>
                            <option value="ingenieria electronica">Ingeniería Electrónica</option>
                            <option value="ingenieria en industrias alimentarias">Ingeniería en Industrias Alimentarias</option>
                            <option value="ingenieria en innovacion agricola sustentable">Ingeniería en Innovación Agrícola Sustentable</option>
                            <option value="ingenieria mecanica">Ingeniería Mecánica</option>
                        </select>
                    </div>

                    <div className='formGroup'>
                        <label>Semestre:</label>
                        <input type="number" name="semestre" placeholder='Semestre' value={dataStudent.semestre} onChange={captureData} required/>
                    </div>
                </div>

                <div className='formRow'>
                    <div className='formGroup'>
                        <label>turno:</label>
                        <select name="turno" value={dataStudent.turno} onChange={captureData} required>
                            <option value="">Seleccionar turno</option>
                            <hr />
                            <option value="matutino">Matutino</option>
                            <option value="vespertino">Vespertino</option>
                        </select>
                    </div>

                    <div className='formGroup'>
                        <label>Correo:</label>
                        <input type="email" name='correo' placeholder='Correo electrónico' value={dataStudent.correo} onChange={captureData} required/>
                    </div>
                </div>

                <div className='formActions'>
                    <button type="submit" className='submitButton'>Guardar</button>
                    <button type="button" className='cancelButton' onClick={closeModal}>Cancelar</button>
                </div>
            </form>
      
        </div>
    </>
  )
}

export default AddStudent
