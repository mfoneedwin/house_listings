import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar/Navbar'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import {
    Explore,
    ForgotPassword,
    Offers,
    Profile,
    SignIn,
    SignUp,
    Category,
    CreateListing,
} from './pages'

function App() {
    return (
        <>
            <Router>
                {/* // Creating pages Routes */}
                <Routes>
                    <Route path='/' element={<Explore />} />
                    <Route path='/offers' element={<Offers />} />
                    <Route
                        path='/category/:categoryName'
                        element={<Category />}
                    />
                    {/* Routing to the home page if not logged in by rapping the profile with the
                    PrivateRoute */}
                    <Route path='/profile' element={<PrivateRoute />}>
                        <Route path='/profile' element={<Profile />} />
                    </Route>
                    <Route path='/sign-in' element={<SignIn />} />
                    <Route path='/sign-up' element={<SignUp />} />
                    <Route
                        path='/forgot-password'
                        element={<ForgotPassword />}
                    />
                    <Route path='/create-listing' element={<CreateListing />} />
                </Routes>
                {/* Navbar */}
                <Navbar />
            </Router>

            <ToastContainer />
        </>
    )
}

export default App
