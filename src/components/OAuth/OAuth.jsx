import { useLocation, useNavigate } from 'react-router-dom'

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
// Get doc setDoc getDoc to update the firebase store
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase.config'
import { toast } from 'react-toastify'
import googleIcon from '../../assets/svg/googleIcon.svg'
import { async } from '@firebase/util'

const OAuth = () => {
    const navaigate = useNavigate()
    const location = useLocation()

    const onGoogleClick = async () => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            // Check for  user in the database
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)

            // If user, doesn't exist, create user
            if (!docSnap.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp(),
                })
            }
            // navigate to home page if user is login with google
            navaigate('/')
            // Something is wrong put out an error
        } catch (error) {
            toast.error('Could not authorize with Google')
        }
    }

    return (
        <div className='socialLogin'>
            <p>
                Sign {location.pathname === '/sign-up' ? ' Up ' : ' In '}
                With
            </p>
            <button className='socialIconDiv' onClick={onGoogleClick}>
                <img className='socialIconImg' src={googleIcon} alt='google' />
            </button>
        </div>
    )
}

export default OAuth
