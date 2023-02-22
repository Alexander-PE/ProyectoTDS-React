import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { useForm } from './hooks/useForm'
import { UserContext } from './UserContext'
import "../styles/globals.css"
import { AppRouter } from './routers/AppRouter'
import { fetchApi } from './Helpers/fetchApi'

function App() {
  const [dataa, setData] = useState([])
  const [values, handleInputChange] = useForm({});
  const { searchText } = values;

  
  useEffect(() => {
    fetchApi(setData)
  }, [])

  const handleSearch = () => {

  }

  return (
    <>
      <UserContext.Provider value={{ dataa, setData, handleInputChange, searchText, handleSearch }}>
        <AppRouter />
      </UserContext.Provider>
    </>
  )
}

export default App

