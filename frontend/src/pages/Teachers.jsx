import AddStudent from './AddStudent'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function Teachers() {

    const [teachers, setTeachers] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [nameComponents, setNameComponents] = useState(false)
    const [filteredTeachers, setFilteredTeachers] = useState([]);

    const openModal = () => {
        setIsModalOpen(true);
        setNameComponents(true)
    }

    const closeModal = () => {
        setIsModalOpen(false); // Cierra el modal
    };

    const fetchProfesores = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/profesores')
            setTeachers(response.data)
            setFilteredTeachers(response.data)
        } catch (ex) {
            console.log("Ha ocurrido un error: ", ex)
        }
        
    }

    const deleteTeacher = async (clave) => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro que deseas eliminar este profesor?',
                text: 'Esta acción no se puede deshacer.',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar'
            });
            if(result.isConfirmed) {
                await axios.delete('http://localhost:4000/api/profesores/' + clave)
                setTeachers(teachers.filter(teacher => teacher.clave !== clave)); // Actualiza el estado después de eliminar
                // Recargar la lista de profesores después de eliminar
                console.log('se preciono el boton de eliminar')
                await fetchProfesores(); 
            }
          
        } catch (ex) {
          console.error('Error deleting student:', ex);
          Swal.fire('Error!', 'No se pudo eliminar el alumno. Inténtalo de nuevo.', 'ex');
        }
      }

       // Función para manejar la búsqueda
    const handleSearch = (value) => {
        if (value) {
            const filtered = teachers.filter(teacher =>
                teacher.clave.includes(value) // Filtrar por número de control
            );
            setFilteredTeachers(filtered);
        } else {
            setFilteredTeachers(students); // Mostrar todos los estudiantes si no hay búsqueda
        }
    };

    const handleEditStudentClick = (num_control) => {
        setIsModalOpen(true); // Abre el modal
    };

    useEffect(() => {
        fetchProfesores()
    }, [isModalOpen])
    

  return (
    <section className='studentsSection'>
        <div className='containerActions'>
            <div className='titleSearch'>
                <span>Profesores</span>

                <div className='inputSearchcontainer'>
                    <input type="search" name="searchStudent" id="searchStudent" placeholder='Buscar profesor...' onChange={e => handleSearch(e.target.value)}/>
                    <button className='text-center'>{iconSearch}</button>
                </div>
            </div>

            <button className='addStudentButton' onClick={openModal}>Agregar Profesores</button>
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-white dark:text-slate-700 border-b" id='tableStudents'>
                    <tr>
                        <th scope="col" className="px-6 py-3 text-center">ID</th>
                        <th scope="col" className="px-6 py-3 text-center">Apellidos</th>
                        <th scope="col" className="px-6 py-3 text-center">Nombre</th>
                        <th scope="col" className="px-6 py-3 text-center">Clave</th>
                        <th scope="col" className="px-6 py-3 text-center">Número de Teléfono</th>
                        <th scope="col" className="px-6 py-3 text-center">Correo</th>
                        <th scope="col" className="px-6 py-3 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody class="text-xs font-medium text-gray-500 uppercase bg-white dark:bg-white dark:text-slate-700 select-none">
                    {filteredTeachers.map((teacher) => (

                        <tr class="bg-white border-b dark:bg-white dark:border-gray-300 hover:bg-white dark:hover:bg-slate-300" key={teacher.id}>
                            <th scope="row" class="px-6 py-4 font-medium text-slate-600 whitespace-nowrap dark:text-slate-600">
                                {teacher.id}
                            </th>
                            <td className="px-6 py-4">{teacher.apellidos}</td>
                            <td className="px-6 py-4">{teacher.nombre}</td>
                            <td className="px-6 py-4 text-center">{teacher.clave}</td>
                            <td className="px-6 py-4 text-center">{teacher.telefono}</td>
                            <td className="px-6 py-4 text-center lowercase">{teacher.correo}</td>
                            <td class="px-6 py-4 text-right">
                                <div className='btnsActionesStudents'>
                                    <Link  class="  font-semibold  p-2 rounded hover:no-underline hover:transition-all duration-300 btnUpdate">{iconUpdate} </Link>
                                    <button onClick={() => deleteTeacher(teacher.clave)} class="  font-semibold  p-2 rounded hover:no-underline hover:transition-all duration-300 btnDelete">{iconDelete}</button>

                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Mostrar el modal si isModalOpen es true */} 
      {isModalOpen && <AddStudent closeModal={() => setIsModalOpen(false)} isTeacher={nameComponents}/>}
    </section>
  )
}

export default Teachers


const iconSearch = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 iconSearch">
<path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

const iconDelete = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 iconDelete">
<path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

const iconUpdate = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 iconUpdate">
<path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>