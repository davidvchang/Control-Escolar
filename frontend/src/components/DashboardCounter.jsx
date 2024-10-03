import React from 'react'

export default function DashboardCounter({nameCategory, number}) {
  return (
    <div className='dashboardCounter'>
        <span>{nameCategory}</span>
        <span className='number'>{number}</span>
      </div>
  )
}
