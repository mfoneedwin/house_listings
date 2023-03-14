import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase.config'
import { toast } from 'react-toastify'
import { async } from '@firebase/util'

const Contact = () => {
    const [message, setMessage] = useState('')
    const [landlord, setLandlaord] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()

    const params = useParams()

    useEffect(() => {
        const getLandlord = async () => {
            const docRef = doc(db, 'users', params.landloardId)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                setLandlaord(docSnap.data())
            } else {
                toast.error('Could not get landlord data')
            }
        }

        getLandlord()
    }, [params.landloardId])

    const onChange = (e) => {
        setMessage(e.target.value)
    }

    return (
        <div className='pageContainer'>
            <header>
                <p className='pageHeader'>Contact Lanlord</p>
            </header>

            {landlord !== null && (
                <main>
                    <div className='contactLandlorad'>
                        <p className='landlordName'>Contact {landlord?.name}</p>
                    </div>

                    <form className='messageForm'>
                        <div className='messageDiv'>
                            <label htmlFor='message' className='messageLable'>
                                Message
                            </label>
                            <textarea
                                name='message'
                                id='message'
                                className='textarea'
                                value={message}
                                onChange={onChange}
                            ></textarea>
                        </div>

                        <a
                            href={`mailto:${
                                landlord.email
                            }?Subject=${searchParams.get(
                                'listingName'
                            )}&body=${message}`}
                        >
                            <button type='' className='primaryButton'>
                                Send Message
                            </button>
                        </a>
                    </form>
                </main>
            )}
        </div>
    )
}

export default Contact
