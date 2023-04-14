import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export const Informacion = ({desap, handleDelete, handleEdit }) => {

  const fecha = new Date(desap.missingDate)
  const fechaa = fecha.toLocaleDateString()

  return (
    <div className='justify-start'>
        <h1 className='text-3xl mb-3'>Nombre: {desap.name}</h1>
        {!!desap.reward && <h1 className='text-4xl mb-3'>Recompensa: {desap.reward} RD$</h1>}
        <h1 className='text-3xl mb-3'>Contacto: {desap.contactNumber}</h1>
        <h1 className='text-3xl mb-3'>Fecha de publicacion: {fechaa}</h1>
        <p className='text-2xl mb-3'>Ultima vez visto en: {desap.lastSeenLocation}</p>
        <p className='text-2xl mb-3'>Descripcion: {desap.description}</p>
        {
          (desap.latitude !== null && desap.longitude !== null) 
            ?
            <div id='map'>
              <MapContainer center={[desap.latitude, desap.longitude]} zoom={13} style={{height: '200px'}}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[desap.latitude, desap.longitude]}>
                  <Popup>Ultima vez visto aca!!</Popup>
                </Marker>
              </MapContainer>
            </div>
          :
          <h2>El usuario no ha proporcionado una localizacion, Llame al numero de telefono en caso de alguna informacion</h2>
        }
        {
          desap.createdBy === localStorage.getItem('user') && 
          <>
            <button onClick={handleDelete} className="btn btn-outline btn-error mt-6">Delete</button>
            <button onClick={handleEdit} className="btn btn-outline mt-6 ml-3">Edit</button>
          </>
        }
      </div>
  )
}

