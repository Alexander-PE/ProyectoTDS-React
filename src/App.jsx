import { useState, useEffect } from 'react'
import { UserContext } from './UserContext'
import { AppRouter } from './routers/AppRouter'
import { fetchApi } from './Helpers/fetchApi'
import '../styles/globals.css'

function App () {
  const [dataa, setData] = useState([])
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    fetchApi(setData)
  }, [])

  return (
    <>
      <UserContext.Provider value={{ dataa, setData, fetchApi, filtered, setFiltered }}>
        <AppRouter />
      </UserContext.Provider>
    </>
  )
}

export default App
