import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../../assets/svg/deleteIcon.svg'
import bedIcon from '../../assets/svg/bedIcon.svg'
import bathtubIcon from '../../assets/svg/bathtubIcon.svg'

const ListingItem = ({ listing, id, onDelete }) => {
    return (
        <li className='categoryListing'>
            {/* // link route to each listing from the database */}
            <Link
                to={`/category/${listing.type}/${id}`}
                className='categoryListingLink'
            >
                {/* imgUrls from the database input */}
                <img
                    src={listing.imgUrls[0]}
                    alt={listing.name}
                    className='categoryListingImg'
                />
                <div className='categoryListingDetails'>
                    <p className='categoryListingLocation'>
                        {listing.location}
                    </p>
                    <p className='categoryListingName'>{listing.name}</p>
                    <p className='categoryListingPrice'>
                        $
                        {listing.offer
                            ? listing.discountedPrice
                                  // Putting a comma in price
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            : listing.regularPrice
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        {/* // if listing type rent add the /Month */}
                        {listing.type === 'rent' && '/ Month'}
                    </p>
                    <div className='categoryListingInfoDiv'>
                        <img src={bedIcon} alt='bed' />
                        <p className='categoryListingInfoText'>
                            {listing.bedrooms > 1
                                ? `${listing.bedrooms} Bedrooms`
                                : '1 Bedroom'}
                        </p>
                        <img src={bathtubIcon} alt='bath' />
                        <p className='categoryListingInfoText'>
                            {listing.bathrooms > 1
                                ? `${listing.bathrooms} Bathrooms`
                                : '1 bathroom'}
                        </p>
                    </div>
                </div>
            </Link>
            {onDelete && (
                <DeleteIcon
                    className='removeIcon'
                    fill='rgb(231, 76,60)'
                    onClick={() => onDelete(listing.id, listing.name)}
                />
            )}
        </li>
    )
}

export default ListingItem
