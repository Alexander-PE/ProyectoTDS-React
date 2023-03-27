import React, { useContext } from 'react'
import { Card } from '../components/Card'
import { UserContext } from '../UserContext'

export const HomePage = () => {
  const { dataa, filtered } = useContext(UserContext)

  const fil = filtered.map(({ name, type, id, description }, index) => <Card key={index} name={name} type={type} id={id} description={description} />)
  const dat = dataa.map(({ name, type, id, description }, index) => <Card key={index} name={name} type={type} id={id} description={description} />)

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6'>
      {
        (filtered.length >= 1) ? fil : dat
      }
    </div>
  )
}
