import React, { useRef, useContext } from 'react';
import { CartContext } from './CartContext';
import { useEffect } from 'react';

export function Nav() {
	let menu = useRef(null);
	let cartContent = useRef(null);

	let { cart, cart_l, clearCart } = useContext(CartContext);

	let toggleMenu = () => {
		let menuClassList = menu.current.classList;
		if (menuClassList.contains('show__menu')) {
			menuClassList.remove('show__menu');
		} else {
			menuClassList.add('show__menu');
		}
	};

	useEffect(() => {
		let handleClickOutSide = (e) => {
			if (
				!e.target.matches('.cartbtn') &&
				!e.target.matches('.cartbtn img') &&
				!e.target.matches('.cartbtn .badge') &&
				!e.target.matches('.addBTN') &&
				!e.target.matches('.plus') &&
				!e.target.matches('.plus img') &&
				!e.target.matches('.minus') &&
				!e.target.matches('.minus img')
			) {
				cartContent.current.classList.add('hide');
			}
		};
		document.addEventListener('click', handleClickOutSide);

		return () => {
			document.removeEventListener('click', handleClickOutSide);
		};
	}, []);

	return (
		<nav className='nav'>
			<div className='logo'>
				<button onClick={toggleMenu} className='nav__btn'>
					<img src='./images/icon-menu.svg' alt='menu btn' />
				</button>
				<a href='#'>
					<img
						className='logo__image'
						src='./images/logo.svg'
						alt='Sneakers Logo'
					/>
				</a>
			</div>
			{/* menu */}
			<ul ref={menu} className='menu'>
				<button onClick={toggleMenu} className='close__btn'>
					<img src='./images/icon-close.svg' alt='close btn' />
				</button>
				<li className='menu__item'>
					<a href='#' className='menu__link'>
						Collections
					</a>
				</li>
				<li className='menu__item'>
					<a href='#' className='menu__link'>
						Men
					</a>
				</li>
				<li className='menu__item'>
					<a href='#' className='menu__link'>
						Women
					</a>
				</li>
				<li className='menu__item'>
					<a href='#' className='menu__link'>
						About
					</a>
				</li>
				<li className='menu__item'>
					<a href='#' className='menu__link'>
						Contact
					</a>
				</li>
			</ul>
			{/* end menu */}
			<div className='nav__funcs'>
				<button
					onClick={() => {
						cartContent.current.classList.toggle('hide');
					}}
					className='cartbtn'
				>
					<img src='./images/icon-cart.svg' alt='cart icon' />
					{cart_l > 0 && (
						<span className='badge'>{cart[0].quantity}</span>
					)}
				</button>
				<div ref={cartContent} className='CartContent hide'>
					<h3 className='CartContent__header'>Cart</h3>
					{cart_l > 0 ? (
						<div className='check__area'>
							{cart.map((product) => (
								<div className='check__prod'>
									<img
										className='check__prod-image'
										src={product.images[0].thumb}
									/>
									<div className='details'>
										<p className='check__prod-name'>
											{product.name}
										</p>
										<div className='calcs'>
											<p className='main__price'>
												${product.price} x{' '}
												{product.quantity}
											</p>
											<p className='total__price'>
												$
												{product.price *
													product.quantity}
											</p>
										</div>
									</div>
									<button
										onClick={() => clearCart()}
										className='delete__prod'
									>
										<img src='./images/icon-delete.svg' />
									</button>
								</div>
							))}
							<button className='sp_btn'>Checkout</button>
						</div>
					) : (
						<p className='empty__cart'>your cart is empty</p>
					)}
				</div>
				<div className='profile'>
					<img src='./images/image-avatar.png' alt='avatar' />
				</div>
			</div>
		</nav>
	);
}
