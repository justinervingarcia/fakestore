import React, { useEffect, useState } from 'react';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ShoppingCartIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

const navigation = [
    { name: 'Products', href: '/', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
  ]
  
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Header() {

    const [cart, updateCart] = useState({
        itemCount: 0,
        items: [],
    });

    useEffect(() => {
        console.log('check cart');
        const cart = JSON.parse(localStorage.getItem('cart'));
        console.log('done');
        console.log(cart);
    
        if(cart != null) {
            updateCart({
                itemCount: cart.length,
                items: cart,
            });
        }
    }, [])

    return (
        <Disclosure as="nav" className="bg-white">
            {({ open }) => (
                <>
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                        )}
                        </Disclosure.Button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                            <img
                                className="block lg:hidden h-8 w-auto"
                                src="https://cdn-icons-png.flaticon.com/512/609/609752.png"
                                alt="FakeStore"
                            />
                            <img
                                className="hidden lg:block h-8 w-auto"
                                src="https://cdn-icons-png.flaticon.com/512/609/609752.png"
                                alt="FakeStore"
                            />
                            <div className="sm:block sm:ml-4 text-gray-600 w-auto">
                                FakeStore
                            </div>
                            
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                    item.current ? 'bg-yellow-200 text-gray-600' : 'text-gray-600 hover:bg-yellow-200 hover:text-gray-600',
                                    'px-3 py-2 rounded-md text-sm font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button
                            type="button"
                            className="bg-white p-1 rounded-full text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            >
                            <span className="sr-only">View Shopping Cart</span>
                            <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                            ({cart.itemCount})
                        </button>
                      </div>
                    </div>
                </div>

                <Disclosure.Panel className="sm:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                        <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'block px-3 py-2 rounded-md text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                        >
                        {item.name}
                        </a>
                    ))}
                    </div>
                </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}

export default Header;