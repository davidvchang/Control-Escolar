import React, { useEffect, useState } from 'react'
import DashboardCounter from '../components/DashboardCounter'
import axios from 'axios'

function DashBoard() {

  const [numStudents, setNumStudents] = useState();
  const [numTeachers, setNumTeachers] = useState();

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/estudiantes');
      if(response.data.length === 0) {
        setNumStudents(0);
      }
      else{
        setNumStudents(response.data.length);

      }
    } catch (ex) {
      
    }
  }

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/profesores');
      if(response.data.length === 0) {
        setNumTeachers(0);
      }
      else{
        setNumTeachers(response.data.length);

      }
    } catch (ex) {
      
    }
  }

  useEffect(() => {
    fetchStudents()
    fetchTeachers()
  
  }, [])
  

  return (
    <section className='dashboardSection'>
      <span>Panel</span>

      <div className='containerInfoCounter'>
        <DashboardCounter nameCategory="ESTUDIANTES" number={numStudents}/>
        <DashboardCounter nameCategory="PROFESORES" number={numTeachers}/>
      </div>
    </section>
  )
}

export default DashBoard
