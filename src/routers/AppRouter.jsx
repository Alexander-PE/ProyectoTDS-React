import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { AnimalPage } from '../pages/AnimalPage'
import { CosaPage } from '../pages/CosaPage'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { New } from '../pages/New'
import { PersonaPage } from '../pages/PersonaPage'
import { RegisterPage } from '../pages/RegisterPage'

export const AppRouter = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/Persona/:personaId' element={<PersonaPage />} />
        <Route path='/Cosa/:cosaId' element={<CosaPage />} />
        <Route path='/Animal/:animalId' element={<AnimalPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/new' element={<New />} />
        <Route path='/added' element={<Navigate to='/' />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </Router>
  )
}
