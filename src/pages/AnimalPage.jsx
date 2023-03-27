import React, { useMemo, useContext } from 'react'
import { getAnimalById } from '../Helpers/getAnimalById'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'

export const AnimalPage = () => {
  const { dataa } = useContext(UserContext)

  const navigate = useNavigate()

  const { animalId } = useParams()

  const animal = useMemo(() => getAnimalById(dataa, animalId), [animalId])

  if (!animal) {
    return <Navigate to='/' />
  }

  const handleReturn = () => {
    navigate(-1) // el -1 es para que vuelva a la pagina que estaba antes
  }

  console.log(animal)

  return (
    <div>AnimalPage</div>
  )
}
