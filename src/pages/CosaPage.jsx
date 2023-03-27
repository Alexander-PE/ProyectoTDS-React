import React, { useMemo, useContext } from 'react'
import { getCosaById } from '../Helpers/getCosaById'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'

export const CosaPage = () => {
  const { dataa } = useContext(UserContext)

  const navigate = useNavigate()

  const { cosaId } = useParams()

  const cosa = useMemo(() => getCosaById(dataa, cosaId), [cosaId])

  if (!cosa) {
    return <Navigate to='/' />
  }

  const handleReturn = () => {
    navigate(-1) // el -1 es para que vuelva a la pagina que estaba antes
  }

  console.log(cosa)

  return (
    <div>CosaPage</div>
  )
}
