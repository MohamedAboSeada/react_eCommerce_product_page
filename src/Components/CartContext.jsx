import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
	let [cart, setCart] = useState([]);

	let isProductInCart = (product) => {
		return cart.some((pro) => pro.id === product.id);
	};

	let UpdateQunatity = (product, minus = false) => {
		setCart((prevProducts) =>
			prevProducts.map((pro) => {
				if (pro.id === product.id) {
					if (!minus) {
						return { ...pro, quantity: pro.quantity + 1 };
					}

					return { ...pro, quantity: pro.quantity - 1 };
				}
				return pro;
			})
		);
	};

	let addProduct = (product) => {
		if (!isProductInCart(product)) {
			setCart((prevProducts) => [
				...prevProducts,
				{ ...product, quantity: 1 },
			]);
		} else {
			UpdateQunatity(product);
		}
	};

	let removeProduct = (product) => {
		if (cart.length > 0) {
			if (cart[0].quantity === 1) {
				clearCart();
			} else {
				UpdateQunatity(product, true);
			}
		}
	};

	let clearCart = () => {
		setCart([]);
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				cart_l: cart.length,
				addProduct,
				clearCart,
				removeProduct,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}
