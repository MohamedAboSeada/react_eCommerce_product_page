import React from 'react';
import { ProductGallery } from './ProductGallery';
import { Product } from '../assets/Product';

export function LightBox({ setHidden, hidden }) {
	return (
		<div className={`LightBox ${hidden ? 'hide' : ''}`}>
			<ProductGallery
				product__images={Product.images}
				isLightBox={true}
				setHidden={setHidden}
			/>
		</div>
	);
}
