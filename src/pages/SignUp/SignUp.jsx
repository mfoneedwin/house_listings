import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase.config'

import { ReactComponent as ArrowRightIcon } from '../../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../../assets/svg/visibilityIcon.svg'
import OAuth from '../../components/OAuth/OAuth'

const Signup = () => {
    // using state to manage password and form input
    const [showPassword, setShowPassword] = useState(false)
    const [formData, SetFormData] = useState({
        email: '',
        password: '',
        name: '',
    })
    // distructuring the  mail and password from the formdata
    const { name, email, password } = formData

    const navigate = useNavigate()
    // setFormData on change when typing in the form space
    const onChange = (e) => {
        SetFormData((prevState) => ({
            ...prevState,
            // id here tagets all the id's in the formdata
            [e.target.id]: e.target.value,
        }))
    }
    // Submit the form
    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const auth = getAuth()

            const userCredentials = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )

            const user = userCredentials.user

            updateProfile(auth.currentUser, {
                displayName: name,
            })

            // I dont want to change the form data state but to copy it by creating an object and spread across
            const formDataCopy = { ...formData }
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp()

            // Add a new document to the collection dataBase
            await setDoc(doc(db, 'users', user.uid), formDataCopy)
            navigate('/')
        } catch (error) {
            toast.error('Something went wrong with registration')
        }
    }

    return (
        <div>
            <div className='pageContainer'>
                <header>
                    <p className='pageHeader'>Welcome Back!</p>
                </header>
                <form onSubmit={onSubmit}>
                    <input
                        type='text'
                        className='nameInput'
                        placeholder='Name'
                        id='name'
                        value={name}
                        onChange={onChange}
                    />
                    <input
                        type='email'
                        className='emailInput'
                        placeholder='Email'
                        id='email'
                        value={email}
                        onChange={onChange}
                    />

                    <div className='passwordInputDiv'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className='passwordInput'
                            placeholder='Password'
                            id='password'
                            value={password}
                            onChange={onChange}
                        />
                        {/* // show password */}
                        <img
                            src={visibilityIcon}
                            alt='show password'
                            className='showPassword'
                            onClick={() =>
                                setShowPassword((prevState) => !prevState)
                            }
                        />
                    </div>
                    <Link to='/forgot-password' className='forgotPasswordLink'>
                        Forgot Password
                    </Link>
                    <div className='signUpBar'>
                        <p className='signUpText'>Sign Up</p>
                        <button className='signUpButton'>
                            <ArrowRightIcon
                                fill='#fffff'
                                width='34px'
                                height='34px'
                            />
                        </button>
                    </div>
                </form>

                {/* Google OAuth */}
                <OAuth />

                <Link to='/sign-in' className='registerLink'>
                    Sign in Instead
                </Link>
            </div>
        </div>
    )
}

export default Signup
