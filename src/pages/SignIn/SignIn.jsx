import { useState } from 'react'
import { toast } from 'react-toastify'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../../assets/svg/visibilityIcon.svg'
import OAuth from '../../components/OAuth/OAuth'
import { async } from '@firebase/util'

const Signin = () => {
    // using state to manage password and form input
    const [showPassword, setShowPassword] = useState(false)
    const [formData, SetFormData] = useState({
        email: '',
        password: '',
    })
    // distructuring the  mail and password from the formdata
    const { email, password } = formData

    const navigate = useNavigate()
    // setFormData on change when typing in the form space
    const onChange = (e) => {
        SetFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const auth = getAuth()

            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )

            if (userCredential.user) {
                navigate('/')
            }
        } catch (error) {
            toast.error('Bad User Credentials')
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
                    <div className='signInBar'>
                        <p className='signInText'>Sign In</p>
                        <button className='signInButton'>
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

                <Link to='/sign-up' className='registerLink'>
                    Sign up instead
                </Link>
            </div>
        </div>
    )
}

export default Signin
