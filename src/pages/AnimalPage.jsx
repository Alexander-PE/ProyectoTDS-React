import React, { useMemo, useContext } from 'react'
import { getItemById } from '../Helpers/getItemById'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'
import axios from 'axios';
import { Imagen } from '../components/Imagen';
import { Informacion } from '../components/Informacion';

export const AnimalPage = () => {
  const { dataa, simpleFetch } = useContext(UserContext)
  const navigate = useNavigate()
  const { animalId } = useParams()
  const animal = useMemo(() => getItemById(dataa, animalId), [animalId])

  if (!animal) {
    return <Navigate to='/' />
  }

  const handleEdit = (e) => {
    e.preventDefault()
    navigate(`/edit/${animalId}`)
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    await axios.delete(`http://localhost:3001/desaparecidos/${animalId}`)
    simpleFetch()
    navigate(-1)
  }

  console.log(animal)

  return (
    <div className='flex justify-evenly mt-5'>
      <Imagen imagen={animal.imageLink} />
      <Informacion handleDelete={handleDelete} handleEdit={handleEdit} desap={animal} />
    </div>
  )
}
