import React, { useMemo, useContext } from 'react'
import { getPersonaById } from '../Helpers/getPersonaById'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'

export const PersonaPage = () => {
  const { dataa } = useContext(UserContext)

  const navigate = useNavigate()

  const { personaId } = useParams()

  const persona = useMemo(() => getPersonaById(dataa, personaId), [personaId])

  if (!persona) {
    return <Navigate to='/' />
  }

  const handleReturn = () => {
    navigate(-1) // el -1 es para que vuelva a la pagina que estaba antes
  }

  console.log(persona)

  return (
    <div>PersonaPage</div>
  )
}
