import React, { useMemo, useContext } from 'react'
import { getItemById } from '../Helpers/getItemById'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

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
  
  const handleDelete = async(e) => {
    e.preventDefault()
    await axios.delete(`http://localhost:3001/desaparecidos/${cosaId}`)
    simpleFetch()
    navigate(-1) // el -1 es para que vuelva a la pagina que estaba antes
  }

  console.log(cosa)
  const fecha = new Date(cosa.missingDate)
  const fechaa = fecha.toLocaleDateString()

  return (
    <div className='flex justify-evenly mt-5'>
      <div className='w-4/12'> 
        <img src={cosa.imageLink} alt='imagen de desaparecido' className='w-9/12 h-9/12 object-cover' />
      </div>
      <div className='justify-start'>
        <h1 className='text-3xl mb-3'>Nombre: {cosa.name}</h1>
        {!!cosa.reward && <h1 className='text-4xl mb-3'>Recompensa: {cosa.reward} RD$</h1>}
        <h1 className='text-3xl mb-3'>Contacto: {cosa.contactNumber}</h1>
        <h1 className='text-3xl mb-3'>Fecha de publicacion: {fechaa}</h1>
        <p className='text-2xl mb-3'>Ultima vez visto en: {cosa.lastSeenLocation}</p>
        <p className='text-2xl mb-3'>Descripcion: {cosa.description}</p>
        {
          (cosa.latitude !== null && cosa.longitude !== null) 
            ?
            <div id='map'>
              <MapContainer center={[cosa.latitude, cosa.longitude]} zoom={13} style={{height: '200px'}}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[cosa.latitude, cosa.longitude]}>
                  <Popup>Ultima vez visto aca!!</Popup>
                </Marker>
              </MapContainer>
            </div>
          :
          <h2>El usuario no ha proporcionado una localizacion, Llame al numero de telefono en caso de alguna informacion</h2>
        }
        {
          cosa.createdBy === localStorage.getItem('user') && 
          <>
            <button onClick={handleDelete} className="btn btn-outline btn-error mt-6">Delete</button>
            <button onClick={handleEdit} className="btn btn-outline mt-6 ml-3">Edit</button>
          </>
        }
      </div>
    </div>
  )
}
