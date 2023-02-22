import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { HomePage } from '../pages/HomePage';
import { PersonaPage } from '../pages/PersonaPage';

export const AppRouter = () => {
    return (
        <Router>
            <NavBar/>
            <Routes>
                <Route path='/Persona/:personaId' element={<PersonaPage />} />
                <Route path='/Cosa/:cosaId' element={<HomePage />} />
                <Route path='/Animal/:animalId' element={<HomePage />} />
                <Route path='/' element={<HomePage />} /> 
            </Routes>
        </Router>
    )
}
