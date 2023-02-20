import { DashboardRoutes } from './DashboardRoutes';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/*' element={<DashboardRoutes />} />
            </Routes>
        </Router>
    )
}
