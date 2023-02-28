import { useNavigate, useLocation } from 'react-router-dom'
import { ReactComponent as OfferIcon } from '../../assets/svg/localOfferIcon.svg'
import { ReactComponent as ExploreIcon } from '../../assets/svg/exploreIcon.svg'
import { ReactComponent as PersonOutlineIcon } from '../../assets/svg/personOutlineIcon.svg'

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    // passing the location route to true
    const pathMatchRoute = (route) => {
        if (route == location.pathname) {
            return true
        }
    }

    return (
        <footer className='navbar'>
            <nav className='navbarNav'>
                <ul className='navbarListItems'>
                    <li
                        className='navbarListItem'
                        onClick={() => navigate('/')}
                    >
                        <ExploreIcon
                            // looping through the fill to show route colors when active to the route
                            fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'}
                            width='36px'
                            height='36px'
                        />
                        <p
                            className={
                                //loop through the p.tag to give it a class text color
                                pathMatchRoute('/')
                                    ? 'navbarListItemNameActive'
                                    : 'navbarListItem'
                            }
                        >
                            Explore
                        </p>
                    </li>
                    <li
                        className='navbarListItem'
                        onClick={() => navigate('/offers')}
                    >
                        <OfferIcon
                            fill={
                                pathMatchRoute('/offers')
                                    ? '#2c2c2c'
                                    : '#8f8f8f'
                            }
                            width='36px'
                            height='36px'
                        />
                        <p
                            className={
                                //loop through the p.tag to give it a class text color
                                pathMatchRoute('/offers')
                                    ? 'navbarListItemNameActive'
                                    : 'navbarListItem'
                            }
                        >
                            Offers
                        </p>
                    </li>
                    <li
                        className='navbarListItem'
                        onClick={() => navigate('/profile')}
                    >
                        <PersonOutlineIcon
                            fill={
                                pathMatchRoute('/profile')
                                    ? '#2c2c2c'
                                    : '#8f8f8f'
                            }
                            width='36px'
                            height='36px'
                        />
                        <p
                            className={
                                //loop through the p.tag to give it a class text color
                                pathMatchRoute('/profile')
                                    ? 'navbarListItemNameActive'
                                    : 'navbarListItem'
                            }
                        >
                            Profile
                        </p>
                    </li>
                </ul>
            </nav>
        </footer>
    )
}
export default Navbar
