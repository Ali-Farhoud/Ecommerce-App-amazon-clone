import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import { Link } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import { auth } from './firebase'

function Header() {
	// context api hook for global data storage
	const [state, dispatch] = useStateValue()
	// signout user if user exists (signedIn) on click of sign in div
	// auth is firebase object related to the authentication
	const handleAuthentication = () => {
		if (state.user) {
			auth.signOut()
		}
	}

	return (
		<div className='header'>
			<Link to='/'>
				<h2 className='header__logo'>E-Commerce</h2>
			</Link>
			<div className='header__search'>
				<input type='text' className='header__searchInput' />
				<SearchIcon className='header__searchIcon' />
			</div>
			<div className='header__nav'>
				{/*link to login page if no user is signed in*/}
				<Link to={!state.user && '/login'}>
					<div
						onClick={handleAuthentication}
						className='header__option header__signIn'
					>
						<span className='header__optionLineOne'>
							{' '}
							{state.user ? state.user.email : ' Hello Guest'}
						</span>
						<span className='header__optionLineTwo'>
							{state.user ? 'Sign Out' : 'Sign In'}
						</span>
					</div>
				</Link>
				<Link to='/orders'>
					<div className='header__option'>
						<span className='header__optionLineOne'>Returns</span>
						<span className='header__optionLineTwo'>& Orders</span>
					</div>
				</Link>
				<div className='header__option'>
					<span className='header__optionLineOne'>Your</span>
					<span className='header__optionLineTwo'>Prime</span>
				</div>
				<Link to='/checkout'>
					<div className='header__optionBasket'>
						<ShoppingBasketIcon />
						<span className='header__optionLineTwo header__basketCount'>
							{state.basket.length}
						</span>
					</div>
				</Link>
			</div>
		</div>
	)
}

export default Header
