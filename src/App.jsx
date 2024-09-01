import React, { useEffect, useState } from 'react';
import { Nav } from './Components/Nav';
import { LightBox } from './Components/LightBox';
import { ProductDetails } from './Components/ProductDetails';
import { CartProvider } from './Components/CartContext';
import './App.css';

function App() {
	let [hidden, setHidden] = useState(true);
	let [innerWidht, setInnerWidht] = useState(window.innerWidth);

	useEffect(() => {
		let handleResize = () => {
			setInnerWidht(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [innerWidht]);

	return (
		<CartProvider>
			<div className='sneakers'>
				<div className='container'>
					<Nav />
					{innerWidht >= 600 && (
						<LightBox
							setHidden={setHidden}
							hidden={hidden}
						/>
					)}
					<ProductDetails setHidden={setHidden} />
				</div>
			</div>
		</CartProvider>
	);
}

export default App;
