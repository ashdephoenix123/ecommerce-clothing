import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { BsFillBagFill } from 'react-icons/bs'
import connectDB from "@/middleware/conn";
import ProductModel from '@/models/Product'
import styles from '@/styles/product.module.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from 'next/error';

const Product = ({ addToCart, buyNow, findProduct, variants, error }) => {
    const router = useRouter();
    const { product } = router.query;
    const [pincode, setPincode] = useState('');
    const [message, setMessage] = useState('');
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");

    useEffect(() => {
        if (!error) {
            setColor(findProduct.color)
            setSize(findProduct.size)
        }
    }, [router.query])

    const updatePincode = (e) => {
        const { value } = e.target;
        setPincode(value.slice(0, 6))
    }

    const checkService = async () => {
        if (!pincode || pincode.length < 6) {
            setMessage('Please enter a valid pincode.');
            return toast.error('Please enter a valid pincode.', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        const data = await response.json();

        if (Object.keys(data).includes(pincode)) {
            setMessage('Yay! This Pincode is serviceable.')
            toast.success('Yay! This Pincode is serviceable.', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            setMessage('Sorry! This Pincode is currently unserviceable.')
            toast.error('Sorry! This Pincode is currently unserviceable.', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const refreshVariant = (newcolor, newsize) => {
        const varianturl = `/products/${variants[newcolor][newsize]['productId']}`
        // window.location = varianturl
        router.push(varianturl)
    }

    if (error) {
        return <Error statusCode={error} />
    }

    return (
        <>
            <section className="text-gray-600 body-font overflow-hidden">
                <ToastContainer
                    position="bottom-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="ecommerce" className={`lg:w-1/2 w-full h-3/4 sm:w-1/2 object-cover object-top rounded ${styles.fixImage}`} src={findProduct.img} />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 relative">
                            <h2 className="text-md title-font text-gray-500 tracking-widest">{findProduct.category}</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{findProduct.title} {`(${findProduct.size} / ${findProduct.color.charAt(0).toUpperCase()}${findProduct.color.slice(1)})`}</h1>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-green-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-green-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-green-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-green-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-green-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <span className="text-gray-600 ml-3">4 Reviews</span>
                                </span>
                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>
                                    </a>
                                </span>
                            </div>
                            <p className="leading-relaxed">{findProduct.desc}</p>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                <div className="flex items-center">
                                    <span className="mr-3">Color</span>
                                    {Object.keys(variants).map((individualColor, index) => {
                                        return Object.keys(variants[individualColor]).includes(size) && <button key={index} onClick={() => { refreshVariant(individualColor, size) }} className={`border-2 ml-1 rounded-full w-6 h-6 focus:outline-none ${individualColor === color ? 'border-black' : "border-gray-300"}`} style={{ backgroundColor: individualColor }}></button>
                                    })}

                                </div>


                                <div className="flex ml-6 items-center">
                                    <span className="mr-3">Size</span>
                                    <div className="relative">
                                        <select value={size} onChange={(e) => { refreshVariant(color, e.target.value) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 text-xl pl-3 pr-10">
                                            {color && Object.keys(variants[color]).includes('S') && <option value={'S'}>S</option>}
                                            {color && Object.keys(variants[color]).includes('M') && <option value={'M'}>M</option>}
                                            {color && Object.keys(variants[color]).includes('L') && <option value={'L'}>L</option>}
                                            {color && Object.keys(variants[color]).includes('XL') && <option value={'XL'}>XL</option>}
                                            {color && Object.keys(variants[color]).includes('XXL') && <option value={'XXL'}>XXL</option>}

                                        </select>
                                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span className="title-font font-medium text-2xl text-gray-900">{findProduct.availableQty !== 0 ? '₹' + findProduct.price : <span className='text-red-700 font-semibold'>Out of Stock</span>}</span>
                                <button onClick={() => {
                                    addToCart(findProduct.productId, 1, findProduct.price, findProduct.title, findProduct.size, findProduct.color); toast.success('Added to cart!')
                                }} disabled={findProduct.availableQty === 0} className="disabled:bg-green-300 flex ml-10 text-white bg-green-500 border-0 py-2 px-6 hover:bg-green-600 focus:outline-none rounded"> <BsFillBagFill className='mr-3' size={20} /> Add To Cart</button>
                                <button disabled={findProduct.availableQty === 0} onClick={() => { buyNow(findProduct.productId, 1, findProduct.price, findProduct.title, findProduct.size, findProduct.color); router.push('/checkout') }} className="flex ml-5 text-white bg-green-500 border-0 py-2 px-6 hover:bg-green-600 disabled:bg-green-300 focus:outline-none rounded">Buy Now</button>

                            </div>
                            <div className="flex items-center mt-5">
                                <input type="number" className='p-2 border-2 border-stone-300 rounded-md' placeholder='Enter Pincode' name='pincode' value={pincode} onChange={updatePincode} />
                                <button className="flex ml-2 text-white bg-green-500 border-0 py-3 px-6 focus:outline-none hover:bg-green-600 rounded" onClick={checkService}> Check</button>
                            </div>
                            {/* {message === 'Please enter a valid pincode.' && message !== "" && <div className="text-red-600 mt-2 font-semibold">{message}</div>}
                            {message === 'Sorry! This Pincode is currently unserviceable.' && message !== "" && <div className="text-red-600 mt-2 font-semibold">{message}</div>}
                            {message === 'Yay! This Pincode is serviceable.' && message !== "" && <div className="text-green-600 mt-2 font-semibold">{message}</div>} */}

                            {/* <div className={`p-4 my-4 text-white rounded-lg bg-green-50 dark:bg-gray-600 dark:text-white w-fit checkmark`} role="alert">
                                <span className="font-medium flex items-center"><img height={30} width={30} src="/checkmark.png" alt="checkmark" className='mr-2' />Added to cart!</span>
                            </div> */}
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export async function getServerSideProps(context) {
    let error = null;
    await connectDB();
    const findProduct = await ProductModel.findOne({ productId: context.query.product });
    if (!findProduct) {
        return {
            props: { error: 404 }
        }
    }
    const variants = await ProductModel.find({ title: findProduct.title, category: findProduct.category })
    const colorsCollection = {};
    for (let item of variants) {
        if (colorsCollection[item.color]) {
            colorsCollection[item.color][item.size] = { productId: item.productId }
        } else {
            colorsCollection[item.color] = {};
            colorsCollection[item.color][item.size] = { productId: item.productId }
        }
    }

    return {
        props: { error: error, findProduct: JSON.parse(JSON.stringify(findProduct)), variants: JSON.parse(JSON.stringify(colorsCollection)) }
    }
}

export default Product
