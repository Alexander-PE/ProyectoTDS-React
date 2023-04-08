import React, { useContext, useEffect } from 'react'
import { Card } from '../components/Card'
import { UserContext } from '../UserContext'

export const HomePage = () => {
  const { dataa, filtered } = useContext(UserContext)

  for(let i; i<1 ; i++){
    location.reload()
  }
  
  const fil = filtered.map(({ name, type, id, description, imageUrl}, index) => <Card key={index} name={name} type={type} id={id} description={description} imageUrl={imageUrl} />)
  const dat = dataa.map(({ name, type, id, description, imageUrl}, index) => <Card key={index} name={name} type={type} id={id} description={description} imageUrl={imageUrl} />)

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6'>
      {
        (filtered.length >= 1) ? fil : dat
      }
    </div>
  )
}
