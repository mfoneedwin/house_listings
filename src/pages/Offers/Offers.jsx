import { useEffect, useState } from 'react'
// UseParams to know if is for sale or for rent
import { useParams } from 'react-router-dom'
import {
    collection,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    startAfter,
} from 'firebase/firestore'
import { db } from '../../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../../components/Spinner/Spinner'
import ListingItem from '../../components/ListingItem/ListingItem'

const Offers = () => {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)

    const params = useParams()

    useEffect(() => {
        const fetchListings = async () => {
            try {
                // Get a reference
                const listingsRef = collection(db, 'listings')

                // Create a query
                const q = query(
                    listingsRef,
                    where('offer', '==', true),
                    orderBy('timestamp', 'desc', limit(10))
                )

                // Execute the query
                const querySnap = await getDocs(q)

                const listings = []

                querySnap.forEach((doc) => {
                    // console.log(doc.data)
                    return listings.push({
                        id: doc.id,
                        data: doc.data(),
                    })
                })
                // setting list of listings / Loaing to false once we get the data
                setListings(listings)
                setLoading(false)
            } catch (error) {
                toast.error('Could Not fetch listings')
            }
        }
        fetchListings()
    }, [])

    return (
        <div className='category'>
            <header>
                <p className='pageHeader'>Offers</p>
            </header>

            {loading ? (
                <Spinner />
            ) : listings && listings.length > 0 ? (
                <>
                    <main>
                        <ul className='categoryListings'>
                            {listings.map((listing) => (
                                <ListingItem
                                    listing={listing.data}
                                    id={listing.id}
                                    key={listing.id}
                                />
                            ))}
                        </ul>
                    </main>
                </>
            ) : (
                <p> There are no current offers</p>
            )}
        </div>
    )
}

export default Offers
