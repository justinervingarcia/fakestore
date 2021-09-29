import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import axiosInstance from '../axios';
import { StarIcon } from '@heroicons/react/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function ProductDetails(props) {
    const history = useHistory();
    const productID = props.match.params.id;
   
    const [productState, updateProductState] = useState({
        loading: true,
        details: null,
        added: false,
    });

    useEffect(() => {
        console.log('Get Product Details for ' + productID)
        axiosInstance
            .get('products/' + productID)
            .then((res) =>{
                console.log(res.data);
                updateProductState({
                    loading: false,
                    details: res.data,
                });
            })
            .catch((error) => {
                console.log('error: ' + error.response);
                history.push(`/`);
            })
        
    }, []);

    const handleAddToCart = (e) => {
        e.preventDefault();
        console.log('Add to Cart');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        let itemFound = false;
        for (const item of cart) {
            console.log(item);
            console.log(item.product.id);
            if (productState.details.id == item.product.id){
                item.qty++; 
                itemFound = true;
                updateProductState({...productState, added: true,})
                break;
            }
        }

        if (!itemFound) {
            cart.push({
                product: productState.details,//JSON.stringify(productState.details),
                qty: 1,
            });
        }
        
        console.log(JSON.stringify(cart));

        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.reload();
        // history.push('/');
    }

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    if (!productState.details) return <div className="text-gray-800 mx-auto py-6 px-6">Loading Product..</div> 
    return (
        <div className="bg-">
            <div className="pt-6">
            
                {/* Image gallery */}
                <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-md lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                    <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
                        <img
                        src={productState.details.image}
                        className="w-full h-full object-center object-cover"
                        />
                    </div>
                </div>

                {/* Product info */}
                <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{productState.details.title}</h1>
                        <h4 className="text-lg font-thin">{capitalize(productState.details.category)}</h4>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:mt-0 lg:row-span-3">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl text-gray-900">${productState.details.price}</p>

                        {/* Reviews */}
                        <div className="mt-6">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex justify-start items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                        key={rating}
                                        className={classNames(
                                            productState.details.rating.rate > rating ? 'text-gray-900' : 'text-gray-200',
                                            'h-5 w-5 flex-shrink-0'
                                        )}
                                        aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">{productState.details.rating.rate} out of 5 stars</p>
                                {productState.details.rating.count} reviews
                                
                            </div>
                        </div>

                        <div>
                            <form className="mt-10">
                                <button
                                    type="submit"
                                    className="mt-10 w-full bg-red-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={handleAddToCart}
                                >
                                    Add to cart
                                </button>
                            </form>
                            {productState.added &&
                            <div className="text-green-800 mt-5">Successfully Added!</div>
                            }
                        </div>
                        
                        
                    </div>

                    <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        {/* Description and details */}
                        <div>
                        <h3 className="sr-only">Description</h3>

                        <div className="space-y-6">
                            <p className="text-base text-gray-900">{productState.details.description}</p>
                        </div>
                        </div>

                    </div>
                </div>
            </div>
            </div>
    )
}

export default ProductDetails;