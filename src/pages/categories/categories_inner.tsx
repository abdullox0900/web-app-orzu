import { useContext } from 'react' // Importing useContext hook from React
import { FaArrowLeft } from 'react-icons/fa' // Importing FaArrowLeft icon from react-icons
import { NavLink, useNavigate, useParams } from 'react-router-dom' // Importing NavLink, useNavigate, and useParams from react-router-dom
import { NoProduct } from '../../assets/ilustrations' // Importing NoProduct illustration
import Loading from '../../components/loading/loading' // Importing Loading component
import { Context } from '../../context/langContext' // Importing language context
import { ShoppingCartContext } from '../../context/shoppingCartContext' // Importing shopping cart context
import useFetchData from '../../hooks/useFetchers' // Importing custom hook to fetch data
import useTelegramTheme from '../../hooks/useTelegramTheme' // Importing custom hook for Telegram theme
import { content, ContentMap } from '../../localization/content' // Importing localization content and types

// Defining interface for category data
interface CategoryData {
    data: any
}

// Functional component CategoriesInner
function CategoriesInner() {
    const langContext = useContext(Context) // Using context to access language context
    const shoppingContext = useContext(ShoppingCartContext) // Using context to access shopping cart context
    const theme = useTelegramTheme() // Getting theme from custom Telegram theme hook
    const navigate = useNavigate() // Using useNavigate hook for navigation

    // Function to go back to the previous page
    const goBack = () => {
        navigate(-1) // This will navigate to the previous page
    }

    // Throwing error if context is not within provider
    if (!langContext) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    if (!shoppingContext) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    const { lang } = langContext // Getting the language from the context
    const { slug } = useParams() // Getting the slug parameter from the URL

    const messages = content[lang as keyof ContentMap] // Getting the content based on the current language

    // Using custom hook to fetch data from the API
    const { data, loading, error } = useFetchData<CategoryData>(`https://app.orzugrand.uz/api/frontend/products/${slug}`)

    // If data is loading, render the Loading component
    if (loading) {
        return <Loading />
    }

    // If there's an error or no data, display the error message
    if (error || !data) {
        return <div>Xatolik yuz berdi: {error}</div>
    }

    // Function to format the price in Uzbek som
    function formatUzbekSom(price: number) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    }

    // Returning the list of products or a no product message
    return (
        <>
            {
                data?.data.length == 0 ? (
                    <div className='flex flex-col items-center justify-center'>
                        <NoProduct />
                        <div>{messages.no_product}</div>
                    </div>
                ) : (
                    <>
                        {/* Button to go back to the previous page */}
                        <button onClick={goBack} style={theme == 'dark' ? { backgroundColor: '#27314a', color: 'white', borderColor: '#27314a' } : {}} className="flex items-center justify-center w-[40px] h-[40px] border-[1px] border-slate-200 rounded-full m-[20px]">
                            <FaArrowLeft />
                        </button>
                        <ul className='grid grid-cols-2 gap-4 px-[20px] pb-[20px]'>
                            {
                                // Mapping through the product data to render each product item
                                data?.data?.map((item: any, index: number) => {
                                    return (
                                        <NavLink key={index} to={`/children_item/${item.slug}`}>
                                            <li style={theme == 'dark' ? { backgroundColor: '#27314a', borderColor: '#27314a' } : {}} className='flex flex-col gap-[8px] items-start p-[10px] rounded-[10px] border-[1px] border-slate-200 cursor-pointer h-[240px] transition duration-500 ease-in-out hover:border-[#ffa500]'>
                                                <img className='w-[110px] h-[110px] mx-auto mb-[10px]' src={item.image} alt="" />
                                                <div style={theme == 'dark' ? { color: 'white' } : {}} className='text-left text-[16px]'>{item[`title_${lang}`].length > 14 ? item[`title_${lang}`].slice(0, 14) + '...' : item[`title_${lang}`]}</div>
                                                <div className='text-[16px] text-[#ffa500]'>{`${formatUzbekSom(item.price)} ${messages.som}`}</div>
                                                <span className='text-[11px] bg-[#F16736] text-white p-[4px] rounded-[5px] mb-[8px]'>{`${formatUzbekSom(item.monthly_pay)} ${messages.som} * 1 oy`}</span>
                                                {/* <button className='flex flex-col items-center justify-center text-[18px] w-full h-[40px] text-green-500 border-[1px] border-green-500 rounded-[8px]' onClick={() => addToCart(item)}>
                                                <SlBasket />
                                            </button> */}
                                            </li>
                                        </NavLink>
                                    )
                                })
                            }
                        </ul>
                    </>
                )
            }
        </>
    )
}

export default CategoriesInner
