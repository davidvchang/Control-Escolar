import React, { useEffect, useState } from 'react'
import DashboardCounter from '../components/DashboardCounter'
import axios from 'axios'

function DashBoard() {

  const [numStudents, setNumStudents] = useState();

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/estudiantes');
      setNumStudents(response.data.length);
    } catch (ex) {
      
    }
  }

  useEffect(() => {
    fetchStudents()
  
  }, [])
  

  return (
    <section className='dashboardSection'>
      <span>Panel</span>

      <div className='containerInfoCounter'>
        <DashboardCounter nameCategory="ESTUDIANTES" number={numStudents}/>
        <DashboardCounter nameCategory="PROFESORES" number="2"/>
      </div>
    </section>
  )
}

export default DashBoard
