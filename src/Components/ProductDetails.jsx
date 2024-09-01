import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { Product } from '../assets/Product';
import { ProductGallery } from './ProductGallery';

export function ProductDetails({ setHidden }) {
	let { cart, cart_l, addProduct, removeProduct } = useContext(CartContext);

	return (
		<div className='ProductDetails'>
			{/* product slider */}
			<div className='left'>
				<ProductGallery
					isLightBox={false}
					product__images={Product.images}
					setHidden={setHidden}
				/>
			</div>

			{/* right section */}
			<div className='right'>
				{/* start details */}
				<div className='prod__info'>
					<h3 className='comp__name'>{Product.comp__name}</h3>
					<h1 className='prod__name'>{Product.name}</h1>
					<p className='prod__desc'>{Product.desc}</p>
					<h1 className='prod__price'>
						$
						{Product.price -
							Product.price * (Product.discount / 100)}{' '}
						<span className='prod__dis'>{Product.discount}%</span>
					</h1>
					<h4 className='prod__pre'>${Product.price}</h4>
				</div>
				{/* end details */}

				{/* start buttons */}
				<div className='btns'>
					{cart_l > 0 && (
						<div className='increaseBtn'>
							<button
								className='plus'
								onClick={() => addProduct(Product)}
							>
								<img src='./images/icon-plus.svg' />
							</button>
							<p className='prod__quan'>{cart[0].quantity}</p>
							<button
								className='minus'
								onClick={() => removeProduct(Product)}
							>
								<img src='./images/icon-minus.svg' />
							</button>
						</div>
					)}

					<button
						onClick={() => {
							if (!cart_l) addProduct(Product);
						}}
						className='sp_btn addBTN'
					>
						<svg
							width='22'
							height='20'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z'
								fillRule='nonzero'
							/>
						</svg>
						Add to cart
					</button>
				</div>
				{/* end buttons */}
			</div>
		</div>
	);
}
