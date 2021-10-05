import React from 'react';

const Cart = ({ myCart, updateCart }) => {

    // Capitalizes string
    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Updates the quantity of a specific item in existing cart (Add/Subtract)
    const updateMyCart = (id, action) => {

        let cart = myCart.items;
        let totalPrice = myCart.totalPrice;
        let totalQty = myCart.itemCount;

        for(let item of cart){
            if(item.product.id === id){
                if(action === "add"){
                    item.qty++;
                    totalPrice += item.product.price;
                    totalQty++;
                }
                else{
                    if(item.qty > 1){
                        item.qty--;
                        totalPrice -= item.product.price;
                        totalQty--;
                    }
                }
            }
        }

        updateCart({
            ...myCart,
            itemCount: totalQty,
            totalPrice: totalPrice,
            items: cart,
        });

        localStorage.setItem('cart-justingarcia', JSON.stringify(cart));
    }

    // Removes item from cart
    const removeItem = (id) => {
        const cart = myCart.items;
        const index = cart.findIndex((item, i) => {
            return item.product.id === id
        });

        const item = cart[index];
        cart.splice(index, 1);
    
        updateCart({
            ...myCart,
            itemCount: myCart.itemCount - item.qty,
            items: cart,
            totalPrice: myCart.totalPrice - (item.product.price * item.qty),
        });

        localStorage.setItem('cart-justingarcia', JSON.stringify(cart));

    }

    // Mimics checking out. All items in cart will be removed
    const handleCheckout = () => {
        if(myCart.items.length > 0){
            alert('Thank you for your purchase!');
            updateCart({
                items: [],
                totalPrice: 0,
                itemCount: 0,
            });
            console.log(JSON.stringify([]));
            localStorage.setItem('cart-justingarcia', JSON.stringify([]));
        }
        else {
            alert('Your shopping cart is empty.');
        }
    }
    
    if(myCart.items.length === 0) <div className="text-gray-800 mx-auto py-6 px-6">Loading Cart...</div>
    return (
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative place-content-center max-w-full flex">
                <div className="w-screen max-w-full">
                    <div className="h-full flex flex-col bg-white">
                        <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">

                            <div className="flex items-start justify-between">
                                <div className="text-lg font-medium text-gray-900">Shopping cart</div>
                            </div>

                            <div className="mt-8">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {myCart.items.length === 0 &&
                                            <h1>No items in cart</h1>
                                        }
                                        {myCart.items.map((product) => (
                                            <li key={product.product.id} className="py-6 flex">
                                                <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                                    <img
                                                    src={product.product.image}
                                                    className="w-full h-full object-center object-cover"
                                                    />
                                                </div>

                                                <div className="ml-4 flex-1 flex flex-col">
                                                    <div>
                                                    <div className="flex justify-between text-base text-gray-600">
                                                        <h3>
                                                        <a href={'product/' + product.product.id} className="hover:text-gray-900 ">{product.product.title}</a>
                                                        </h3>
                                                        <div className="text-base text-gray-800 font-normal">
                                                            Subtotal {(product.product.price * product.qty).toFixed(2)}
                                                        </div>
                                                        {/* <p className="ml-4 font-extralight text-md text-gray-400">U.P {product.product.price}</p> */}
                                                    </div>
                                                    <div className="flex justify-start py-4 items-center ">
                                                       
                                                            <p className="text-sm text-gray-600">{capitalize(product.product.category)}</p>
                                                            <p className="ml-4 font-light text-md text-gray-600">U.P {product.product.price}</p>
                                                      
                                                        {/* <div className="text-base text-gray-800 font-normal">
                                                            Subtotal {(product.product.price * product.qty).toFixed(2)}
                                                        </div> */}
                                                    </div>
                                                    
                                                    </div>
                                                    <div className="flex-1 flex items-end justify-between text-sm">
                                                        <div className="flex space-x-4 items-center">
                                                            <p className="text-gray-500">Qty</p>
                                                            <button onClick={() => updateMyCart(product.product.id, "subtract")} className="bg-gray-300 hover:bg-gray-500 rounded p-2">-</button>
                                                            <p className="font-bold">{product.qty}</p>
                                                            <button onClick={() => updateMyCart(product.product.id, "add")} className="bg-gray-300 hover:bg-gray-500 rounded p-2">+</button>
                                                        </div>
                                                    

                                                    <div className="flex">
                                                        <button onClick={() => removeItem(product.product.id)} type="button" className="font-medium text-red-500 hover:text-red-700">
                                                        Remove Item
                                                        </button>
                                                    </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Total</p>
                            <p>${myCart.totalPrice.toFixed(2)}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                            <div className="mt-6 flex justify-end">
                            <button
                                className="flex justify-center items-center px-12 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-500 hover:bg-red-700"
                                onClick={handleCheckout}
                            >
                                Checkout
                            </button>
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Cart;