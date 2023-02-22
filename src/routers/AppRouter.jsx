import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { AnimalPage } from '../pages/AnimalPage';
import { CosaPage } from '../pages/CosaPage';
import { HomePage } from '../pages/HomePage';
import { PersonaPage } from '../pages/PersonaPage';

export const AppRouter = () => {
    return (
        <Router>
            <NavBar/>
            <Routes>
                <Route path='/Persona/:personaId' element={<PersonaPage />} />
                <Route path='/Cosa/:cosaId' element={<CosaPage />} />
                <Route path='/Animal/:animalId' element={<AnimalPage />} />
                <Route path='/' element={<HomePage />} /> 
            </Routes>
        </Router>
    )
}
