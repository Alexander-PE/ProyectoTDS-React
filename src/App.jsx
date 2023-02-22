import { useState, useEffect } from 'react'
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

  const handleSearch = (searchText) => {
    const search = dataa.filter(item => {
      item.name.includes(searchText)
    })
    return search
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

