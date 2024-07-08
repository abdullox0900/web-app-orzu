import { useContext } from 'react' // Importing useContext hook from React
import { FaArrowLeft } from "react-icons/fa" // Importing FaArrowLeft icon from react-icons
import { NavLink, useParams } from 'react-router-dom' // Importing NavLink and useParams from react-router-dom
import Loading from '../../components/loading/loading' // Importing Loading component
import { Context } from '../../context/langContext' // Importing language context
import useFetchData from '../../hooks/useFetchers' // Importing custom hook to fetch data
import useTelegramTheme from '../../hooks/useTelegramTheme' // Importing custom hook for Telegram theme

// Defining interface for category data
interface CategoryData {
    data: {
        children: any
    }
}

// Functional component CategoriesChildren
function CategoriesChildren() {
    // Using context to access language context
    const langContext = useContext(Context)
    const theme = useTelegramTheme() // Getting theme from custom Telegram theme hook

    // Throwing error if context is not within provider
    if (!langContext) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    const { slug } = useParams<{ slug: string }>() // Getting the slug parameter from the URL
    const { lang } = langContext // Getting the language from the context

    // Using custom hook to fetch data from the API
    const { data, loading, error } = useFetchData<CategoryData>(`https://app.orzugrand.uz/api/frontend/categories/${slug}`)

    // If data is loading, render the Loading component
    if (loading) {
        return <Loading />
    }

    // If there's an error or no data, display the error message
    if (error || !data) {
        return <div>Xatolik yuz berdi: {error}</div>
    }

    // Returning the list of category children
    return (
        <>
            {/* Navigation link to go back to the home page */}
            <NavLink to={'/'} style={theme == 'dark' ? { backgroundColor: '#27314a', color: 'white', borderColor: '#27314a' } : {}} className="flex items-center justify-center w-[40px] h-[40px] border-[1px] border-slate-200 rounded-full m-[20px]">
                <FaArrowLeft />
            </NavLink>
            <ul className='grid grid-cols-2 gap-4 px-[20px] pb-[20px]'>
                {
                    // Mapping through the children data to render each child item
                    data?.data?.children?.map((item: any, index: number) => {
                        return (
                            <NavLink to={`/children_inner/${item.slug}`} key={index}>
                                <li style={theme == 'dark' ? { backgroundColor: '#27314a', color: 'white', borderColor: '#27314a' } : {}} className='flex flex-col items-center p-[10px] gap-[5px] rounded-[10px] border-[1px] border-slate-200 cursor-pointer duration-500 ease-in-out hover:border-[#ffa500]'>
                                    <img className='w-[100px] h-[80px]' src={item.image} alt="" />
                                    <span>{item[`title_${lang}`].length > 20 ? item[`title_${lang}`].slice(0, 20) + '...' : item[`title_${lang}`]}</span>
                                </li>
                            </NavLink>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default CategoriesChildren
