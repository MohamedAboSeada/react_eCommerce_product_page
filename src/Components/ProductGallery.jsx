import React, { useState, useRef,useEffect } from 'react';

export function ProductGallery({ product__images, setHidden, isLightBox }) {
	let [index, setIndex] = useState(0);
	let current__image = useRef(null);

	let prev = () => {
		if (index > 0) {
			setIndex((prevIndex) => prevIndex - 1);
		} else {
			setIndex(product__images.length - 1);
		}
	};

	let next = () => {
		if (index < product__images.length - 1) {
			setIndex((prevIndex) => prevIndex + 1);
		} else {
			setIndex(0);
		}
	};

	useEffect(() => {
		if (!isLightBox) {
			const handleClick = (_) => {
				setHidden(false);
			};

			current__image.current.addEventListener('click', handleClick);
			current__image.current.style.cursor = 'zoom-in';

			return () => {
				current__image.current.removeEventListener(
					'click',
					handleClick
				);
			};
		}
	}, [isLightBox]);

	return (
		<div className='lightbox'>
			<button
				onClick={() => setHidden(true)}
				className='close__btn_light'
			>
				<svg width='14' height='15' xmlns='http://www.w3.org/2000/svg'>
					<path
						d='m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z'
						fill='hsl(223, 64%, 98%)'
						fillRule='evenodd'
					/>
				</svg>
			</button>
			<div ref={current__image} className='current__image'>
				{isLightBox && (
					<button className='prev' onClick={prev}>
						<img src='./images/icon-previous.svg' alt='prev' />
					</button>
				)}

				<img
					className='current_prod'
					src={product__images[index].image}
					alt='product__image'
				/>
				{isLightBox && (
					<button className='next' onClick={next}>
						<img src='./images/icon-next.svg' alt='next' />
					</button>
				)}
			</div>
			<div className='gallery'>
				{product__images.map((image, i) => (
					<div
						className={`product__image-container ${
							index === i && 'active'
						}`}
						key={i}
					>
						<img
							className='product__image'
							src={image.thumb}
							alt='product__image'
							onClick={() => setIndex(i)}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
