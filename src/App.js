import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import {
    Explore,
    ForgotPassword,
    Offers,
    Profile,
    SignIn,
    SignUp,
} from './pages'

function App() {
    return (
        <>
            <Router>
                {/* // Creating pages Routes */}
                <Routes>
                    <Route path='/' element={<Explore />} />
                    <Route path='/offers' element={<Offers />} />
                    <Route path='/profile' element={<SignIn />} />
                    <Route path='/sign-in' element={<SignIn />} />
                    <Route path='/sign-up' element={<SignUp />} />
                    <Route
                        path='/forgot-password'
                        element={<ForgotPassword />}
                    />
                </Routes>
                {/* Navbar */}
                <Navbar />
            </Router>
        </>
    )
}

export default App
