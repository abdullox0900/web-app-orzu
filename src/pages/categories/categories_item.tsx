import { useContext } from 'react' // Importing useContext hook from React
import { GrDeliver } from "react-icons/gr" // Importing GrDeliver icon from react-icons
import { SlBasket } from 'react-icons/sl' // Importing SlBasket icon from react-icons
import { useNavigate, useParams } from 'react-router-dom' // Importing useNavigate and useParams from react-router-dom
import { Swiper, SwiperSlide } from "swiper/react" // Importing Swiper and SwiperSlide components from swiper
import Loading from '../../components/loading/loading' // Importing Loading component
import { Context } from '../../context/langContext' // Importing language context
import { ShoppingCartContext } from '../../context/shoppingCartContext' // Importing shopping cart context
import useFetchData from '../../hooks/useFetchers' // Importing custom hook to fetch data
import { content, ContentMap } from '../../localization/content' // Importing localization content and types
import type { NotificationArgsProps } from 'antd' // Importing NotificationArgsProps type from antd
import { notification } from 'antd' // Importing notification from antd
import { FaArrowLeft } from 'react-icons/fa' // Importing FaArrowLeft icon from react-icons
import "swiper/css" // Importing Swiper CSS
import useTelegramTheme from '../../hooks/useTelegramTheme' // Importing custom hook for Telegram theme

// Defining interface for category data
interface CategoryData {
    data: any
}

type NotificationPlacement = NotificationArgsProps['placement']

// Functional component CategoriesItem
function CategoriesItem() {
    const shoppingContext = useContext(ShoppingCartContext) // Using context to access shopping cart context
    const langContext = useContext(Context) // Using context to access language context
    const theme = useTelegramTheme() // Getting theme from custom Telegram theme hook
    const navigate = useNavigate() // Using useNavigate hook for navigation
    const { slug } = useParams() // Getting the slug parameter from the URL
    const [api, contextHolder] = notification.useNotification() // Using notification hook from antd

    // Function to go back to the previous page
    const goBack = () => {
        navigate(-1) // This will navigate to the previous page
    }

    // Using custom hook to fetch data from the API
    const { data, loading, error } = useFetchData<CategoryData>(`https://app.orzugrand.uz/api/frontend/products/view/${slug}`)
    const product = data?.data // Getting the product data

    // Throwing error if context is not within provider
    if (!shoppingContext) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    if (!langContext) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    // If data is loading, render the Loading component
    if (loading) {
        return <Loading />
    }

    // If there's an error or no data, display the error message
    if (error || !data) {
        return <div>Xatolik yuz berdi: {error}</div>
    }

    const { lang } = langContext // Getting the language from the context
    const { addToCart } = shoppingContext // Getting the addToCart function from shopping cart context
    const xabarlar = content[lang as keyof ContentMap] // Getting the content based on the current language

    // Function to open a notification when a product is added to the cart
    const openNotification = (placement: NotificationPlacement) => {
        api.success({
            message: `${xabarlar.notification}`,
            placement,
        })
    }

    // Function to format the price in Uzbek som
    function formatUzbekSom(price: number) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    }

    // Returning the product details
    return (
        <section className='p-[20px] py-0 pb-0 relative'>
            {contextHolder}
            {/* Button to go back to the previous page */}
            <button onClick={goBack} style={theme == 'dark' ? { backgroundColor: '#27314a', color: 'white', borderColor: '#27314a' } : {}} className="flex items-center justify-center w-[40px] h-[40px] border-[1px] border-slate-200 rounded-full mb-[25px]">
                <FaArrowLeft />
            </button>
            {/* Swiper component to display product images */}
            <Swiper className="mySwiper mb-[25px]">
                {
                    product.images.map((item: any, index: number) => {
                        return (
                            <SwiperSlide key={index}>
                                <img className='w-full h-[350px] object-cover' src={item.image} alt="" />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            <div className='flex flex-col gap-[10px] items-start'>
                {/* Product title */}
                <div style={theme == 'dark' ? { color: 'white' } : {}} className='text-[18px]'>{product[`title_${lang}`]}</div>
                {/* Product price */}
                <div className='text-[18px] text-[#ffa500]'>{`${formatUzbekSom(product.price)} ${xabarlar.som}`}</div>
                {/* Product monthly payment */}
                <span className='text-[12px] bg-[#F16736] text-white p-[4px] rounded-[5px]'>{`${formatUzbekSom(product.monthly_pay)} ${xabarlar.som} * 1 oy`}</span>

                {/* Delivery information */}
                <div className='flex items-center gap-[5px]'>
                    <div className='flex items-center gap-[5px] bg-green-500 text-white rounded-[5px] p-[4px] text-[12px]  mb-[8px]'><GrDeliver className='text-[#fff] text-[20px]' />{product.delivery_information[`name_${lang}`]}:</div>
                    <span className='text-[14px] text-gray-500'>{product.delivery_information[`short_description_${lang}`]}</span>
                </div>

                {/* Product description */}
                <div style={theme == 'dark' ? { color: 'white' } : {}} className='text-[22px] mb-[5px]'>Tavsifi</div>
                <p className='text-[14px] text-[#999] mb-[100px]'>{product[`description_${lang}`]}</p>
            </div>
            {/* Footer with add to cart button */}
            <div style={theme == 'dark' ? { backgroundColor: '#27314a', borderColor: '#27314a' } : {}} className='flex items-center justify-between absolute px-[20px] bottom-0 left-0 w-full h-[60px] bg-white border-t-[1px] border-slate-200'>
                <div className='text-[22px] font-bold text-[#ffa500]'>{`${formatUzbekSom(product.price)} ${xabarlar.som}`}</div>

                <button className='flex flex-col items-center justify-center text-[18px] w-[100px] h-[40px] text-green-500 border-[1px] border-green-500 rounded-[8px]' onClick={() => {
                    addToCart(product)
                    openNotification('bottomRight')
                }}>
                    <SlBasket />
                </button>
            </div>
        </section>
    )
}

export default CategoriesItem
