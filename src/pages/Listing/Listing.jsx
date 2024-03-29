import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { getDoc, doc } from 'firebase/firestore'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { getAuth } from 'firebase/auth'
import { db } from '../../firebase.config'
import shareIcon from '../../assets/svg/shareIcon.svg'
import Spinner from '../../components/Spinner/Spinner'
import { async } from '@firebase/util'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

const Listing = () => {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(false)

    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()

    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, 'listings', params.listingId)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                setListing(docSnap.data())
                setLoading(false)
            }
        }

        fetchListing()
    }, [navigate, params.listingId])

    if (loading) {
        return <Spinner />
    }

    return (
        <main>
            {/* SLIDER      */}
            <Swiper slidePerView={1} pagination={{ clickable: true }}>
                {listing.imgUrls.map((url, index) => (
                    <div
                        style={{
                            background: `url(${listing.imgUrls[index]}) center no-repeat`,
                            backgroundSize: 'cover',
                        }}
                        className='swiperSliderDiv'
                    ></div>
                ))}
            </Swiper>

            <div
                className='shareIconDiv'
                onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    setShareLinkCopied(true)
                    setTimeout(() => {
                        setShareLinkCopied(false)
                    }, 2000)
                }}
            >
                <img src={shareIcon} alt='' />
            </div>

            {shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}
            <div className='listingDetails'>
                <p className='listingName'>
                    {listing.name} - $
                    {listing.offer
                        ? listing.discountedPrice
                        : listing.regularPrice}
                </p>
                <p className='listingLocation'>{listing.location}</p>
                <p className='listingType'>
                    For {listing.type === 'rent' ? 'Rent' : 'Sale'}
                </p>
                {listing.offer && (
                    <p className='discountPrice'>
                        ${listing.regularPrice - listing.discountedPrice}
                        discount
                    </p>
                )}

                <ul className='listingDetailsList'>
                    <li>
                        {listing.bedrooms > 1
                            ? `${listing.bedrooms} Bedrooms`
                            : '1 Bedroom'}
                    </li>
                    <li>
                        {listing.bathrooms > 1
                            ? `${listing.bathrooms} Bathrooms`
                            : '1 Bathroom'}
                    </li>
                    <li>{listing.parking && 'Parking Spot'}</li>
                    <li>{listing.furnished && 'Furnished'}</li>
                </ul>

                <p className='listingLocationTitle'>Location</p>

                {/* MAP */}
                <div className='leafletContainer'>
                    <MapContainer
                        style={{ height: '100%', width: '100%' }}
                        center={[
                            listing.geolocation.lat,
                            listing.geolocation.lng,
                        ]}
                        zoom={13}
                        scrollWheel={false}
                    >
                        {/* pass in the link in this component */}
                        <TileLayer />
                        <Marker
                            position={[
                                listing.geolocation.lat,
                                listing.geolocation.lng,
                            ]}
                        >
                            <Popup>{listing.location}</Popup>
                        </Marker>
                    </MapContainer>
                </div>

                {auth.currentUser?.uid !== listing.userRef && (
                    <Link
                        to={`/contact/${listing.userRef}?listingName=${listing.name}`}
                        className='primaryButton'
                    >
                        Contact Landlord
                    </Link>
                )}
            </div>
        </main>
    )
}

export default Listing
