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

const Category = () => {
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
                    where('type', '==', params.categoryName),
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
    }, [params.categoryName])

    return (
        <div className='category'>
            <header>
                <p className='pageHeader'>
                    {params.categoryName === 'rent'
                        ? 'Places for rent'
                        : 'Places for sale'}
                </p>
            </header>

            {loading ? (
                <Spinner />
            ) : listings && listings.length > 0 ? (
                <>
                    <main>
                        <ul className='categoryListings'>
                            {listings.map((listing) => (
                                <h3 key={listing.id}>{listing.data.name}</h3>
                            ))}
                        </ul>
                    </main>
                </>
            ) : (
                <p>No listing for {params.categoryName}</p>
            )}
        </div>
    )
}

export default Category
