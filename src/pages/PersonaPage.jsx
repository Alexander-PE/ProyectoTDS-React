import React, { useMemo, useContext } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getPersonaById } from '../Helpers/getPersonaById'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'
import 'leaflet/dist/leaflet.css';

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

  const fecha = new Date(persona.missingDate)
  const fechaa = fecha.toLocaleDateString()

  return (
    <div className='flex justify-evenly mt-5'>
      <img src={persona.imageUrl} alt='imagen de desaparecido' />
      <div className='justify-start'>
        <h1 className='text-4xl mb-6'>Nombre: {persona.name}</h1>
        {!!persona.reward && <h1 className='text-4xl mb-6'>Recompensa: {persona.reward} RD$</h1>}
        <h1 className='text-4xl mb-6'>Contacto: {persona.contactNumber}</h1>
        <h1 className='text-4xl mb-6'>Fecha de publicacion: {fechaa}</h1>
        <p className='text-2xl'>Descripcion: {persona.description}</p>
        {
          (persona.latitude !== null && persona.length !== null) 
            ?
          <MapContainer center={[Number(persona.latitude), Number(persona.length)]} zoom={13} style={{height: '200px'}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[Number(persona.latitude), Number(persona.length)]}>
              <Popup>Ultima vez visto aca!!</Popup>
            </Marker>
          </MapContainer>
          :
          <h2>El usuario no ha proporcionado una localizacion, Llame al numero de telefono en caso de alguna informacion</h2>
        }
      </div>
    </div>
  )
}
