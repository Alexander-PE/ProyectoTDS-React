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

  const handleDelete = (e) => {
    e.preventDefault()
    axios.delete(`https://localhost:7286/api/Other/${cosaId}`)
    handleReturn()
  }

  console.log(cosa)

  return (
    <div className='flex justify-evenly mt-5'>
      <div className='w-4/12'> 
        <img src={cosa.cloudinaryLink} alt='imagen de desaparecido' className='w-full h-full object-cover' />
      </div>
      <div className='justify-start'>
        <h1 className='text-4xl mb-6'>Nombre: {cosa.name}</h1>
        {!!cosa.reward && <h1 className='text-4xl mb-6'>Recompensa: {cosa.reward} RD$</h1>}
        <h1 className='text-4xl mb-6'>Contacto: {cosa.contactNumber}</h1>
        <h1 className='text-4xl mb-6'>Fecha de publicacion: {fechaa}</h1>
        <p className='text-2xl'>Descripcion: {cosa.description}</p>
        {
          (cosa.latitude !== null && cosa.length !== null) 
            ?
          <MapContainer center={[Number(cosa.latitude), Number(cosa.length)]} zoom={13} style={{height: '200px'}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[Number(cosa.latitude), Number(cosa.length)]}>
              <Popup>Ultima vez visto aca!!</Popup>
            </Marker>
          </MapContainer>
          :
          <h2>El usuario no ha proporcionado una localizacion, Llame al numero de telefono en caso de alguna informacion</h2>
        }
      <button onClick={handleDelete} className="btn btn-outline btn-error mt-6">Delete</button>
      </div>
    </div>
  )
}
