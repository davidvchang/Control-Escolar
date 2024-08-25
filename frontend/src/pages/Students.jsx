import React, { useEffect, useState } from 'react'
import AddStudent from './AddStudent'
import axios from 'axios';

import { Table, Input } from 'antd';



function Students() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    const { Search } = Input;

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/estudiantes');
                setStudents(response.data);
                setFilteredStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

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
    

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
        { title: 'Apellidos', dataIndex: 'apellidos', key: 'apellidos' },
        { title: 'Número de Control', dataIndex: 'num_control', key: 'num_control' },
        { title: 'Número de Teléfono', dataIndex: 'numero_telefono', key: 'numero_telefono' },
        { title: 'Carrera', dataIndex: 'carrera', key: 'carrera' },
        { title: 'Semestre', dataIndex: 'semestre', key: 'semestre' },
        { title: 'Turno', dataIndex: 'turno', key: 'turno' },
        { title: 'Correo', dataIndex: 'correo', key: 'correo' },
    ];

  return (
    <section className='studentsSection'>
        <div className='containerActions'>
            <div className='titleSearch'>
                <span>Alumnos</span>

                <div className='inputSearchcontainer'>
                    <input type="search" name="searchStudent" id="searchStudent" placeholder='Buscar alumno...' onChange={e => handleSearch(e.target.value)}/>
                    <button>{iconSearch}</button>
                </div>
            </div>

            <button className='addStudentButton' onClick={openModal}>Agregar Estudiante</button>
        </div>

        <Table columns={columns} dataSource={filteredStudents} rowKey="id" />

        {/* Mostrar el modal si isModalOpen es true */} 
      {isModalOpen && <AddStudent closeModal={closeModal}/>}
    </section>
  )
}

export default Students


const iconSearch = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 iconSearch">
<path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
