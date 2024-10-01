import React, { useEffect, useState } from 'react'
import AddStudent from './AddStudent'
import axios from 'axios';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

function Students() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);

    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);


    // const { Search } = tableStudents;

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/estudiantes');
            setStudents(response.data);
            setFilteredStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [isModalOpen]);


     // Función para manejar la búsqueda
    const handleSearch = (value) => {
        if (value) {
            const filtered = students.filter(student =>
                student.num_control.includes(value) // Filtrar por número de control
            );
            setFilteredStudents(filtered);
        } else {
            setFilteredStudents(students); // Mostrar todos los estudiantes si no hay búsqueda
        }
    };

    const deleteStudent = async (num_control) => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro que deseas eliminar este estudiante?',
                text: 'Esta acción no se puede deshacer.',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar'
            });
            if(result.isConfirmed) {
                await axios.delete('http://localhost:4000/api/estudiantes/' + num_control)
                setStudents(students.filter(student => student.num_control !== num_control)); // Actualiza el estado después de eliminar
                // Recargar la lista de estudiantes después de eliminar
                await fetchStudents(); 
            }
          
        } catch (ex) {
          console.error('Error deleting student:', ex);
          Swal.fire('Error!', 'No se pudo eliminar el alumno. Inténtalo de nuevo.', 'ex');
        }
      }

  return (
    <section className='studentsSection'>
        <div className='containerActions'>
            <div className='titleSearch'>
                <span>Alumnos</span>

                <div className='inputSearchcontainer'>
                    <input type="search" name="searchStudent" id="searchStudent" placeholder='Buscar alumno...' onChange={e => handleSearch(e.target.value)}/>
                    <button className='text-center'>{iconSearch}</button>
                </div>
            </div>

            <button className='addStudentButton' onClick={openModal}>Agregar Estudiante</button>
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-white dark:text-slate-700" id='tableStudents'>
                    <tr>
                        <th scope="col" className="px-6 py-3 text-center">ID</th>
                        <th scope="col" className="px-6 py-3 text-center border-x">Apellidos</th>
                        <th scope="col" className="px-6 py-3 text-center border-x">Nombre</th>
                        <th scope="col" className="px-6 py-3 text-center border-x">Número de Control</th>
                        <th scope="col" className="px-6 py-3 text-center border-x">Número de Teléfono</th>
                        <th scope="col" className="px-6 py-3 text-center border-x">Carrera</th>
                        <th scope="col" className="px-6 py-3 text-center border-x">Semestre</th>
                        <th scope="col" className="px-6 py-3 text-center border-x">Turno</th>
                        <th scope="col" className="px-6 py-3 text-center border-x">Correo</th>
                        <th scope="col" className="px-6 py-3 text-center border-x"><span className="sr-only">Edit</span></th>
                    </tr>
                </thead>
                <tbody class="text-xs font-medium text-gray-500 uppercase bg-white dark:bg-white dark:text-slate-700 select-none">
                    {filteredStudents.map((student) => (

                        <tr class="bg-white border-b dark:bg-white dark:border-gray-400 hover:bg-white dark:hover:bg-slate-200" key={student.id}>
                            <th scope="row" class="px-6 py-4 font-medium text-slate-600 whitespace-nowrap dark:text-slate-600">
                                {student.id}
                            </th>
                            <td className="px-6 py-4 border-x">{student.apellidos}</td>
                            <td className="px-6 py-4 border-x">{student.nombre}</td>
                            <td className="px-6 py-4 border-x text-center">{student.num_control}</td>
                            <td className="px-6 py-4 border-x text-center">{student.numero_telefono}</td>
                            <td className="px-6 py-4 border-x max-w-80">{student.carrera}</td>
                            <td className="px-6 py-4 border-x text-center">{student.semestre}</td>
                            <td className="px-6 py-4 border-x text-center">{student.turno}</td>
                            <td className="px-6 py-4 border-x text-center lowercase">{student.correo}</td>
                            <td class="px-6 py-4 text-right">
                                <div className='btnsActionesStudents'>
                                    <button onClick={() => openModal(student)}  class=" text-orange-800 font-semibold  p-2 rounded hover:no-underline hover:transition-all duration-300 btnUpdate">{iconUpdate} </button>
                                    <button onClick={() => deleteStudent(student.num_control)} class=" text-orange-800 font-semibold  p-2 rounded hover:no-underline hover:transition-all duration-300 btnDelete">{iconDelete}</button>

                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Mostrar el modal si isModalOpen es true */} 
      {isModalOpen && <AddStudent closeModal={closeModal}/>}
    </section>
  )
}

export default Students


const iconSearch = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 iconSearch">
<path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

const iconDelete = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 iconDelete">
<path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

const iconUpdate = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 iconUpdate">
<path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

