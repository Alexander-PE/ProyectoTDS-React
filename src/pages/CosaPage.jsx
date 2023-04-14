import React, { useMemo, useContext } from 'react'
import { getItemById } from '../Helpers/getItemById'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'
import axios from 'axios';
import { Imagen } from '../components/Imagen';
import { Informacion } from '../components/Informacion';

export const CosaPage = () => {
  const { dataa, simpleFetch } = useContext(UserContext)
  const navigate = useNavigate()
  const { cosaId } = useParams()
  const cosa = useMemo(() => getItemById(dataa, cosaId), [cosaId])

  if (!cosa) {
    return <Navigate to='/' />
  }

  const handleEdit = (e) => {
    e.preventDefault()
    navigate(`/edit/${cosaId}`)
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    await axios.delete(`http://localhost:3001/desaparecidos/${cosaId}`)
    simpleFetch()
    navigate(-1) // el -1 es para que vuelva a la pagina que estaba antes
  }

  console.log(cosa)

  return (
    <div className='flex justify-evenly mt-5'>
      <Imagen imagen={cosa.imageLink} />
      <Informacion handleDelete={handleDelete} handleEdit={handleEdit} desap={cosa} />
    </div>
  )
}
