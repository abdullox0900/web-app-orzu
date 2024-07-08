import { useContext } from 'react' // Importing useContext hook from React
import { NavLink } from 'react-router-dom' // Importing NavLink from react-router-dom
import Loading from '../../components/loading/loading' // Importing Loading component
import { Context } from '../../context/langContext' // Importing language context
import useFetchData from '../../hooks/useFetchers' // Importing custom hook to fetch data
import useTelegramTheme from '../../hooks/useTelegramTheme' // Importing custom hook for Telegram theme

// Defining interface for category data
interface CategoryData {
    data: any
}

// Functional component Categories
function Categories() {
    const langContext = useContext(Context) // Using context to access language context
    const theme = useTelegramTheme() // Getting theme from custom Telegram theme hook

    // Throwing error if context is not within provider
    if (!langContext) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    // Using custom hook to fetch data from the API
    const { data, loading, error } = useFetchData<CategoryData>('https://app.orzugrand.uz/api/frontend/categories')
    const { lang } = langContext // Getting the language from the context

    // If data is loading, render the Loading component
    if (loading) return <Loading />
    // If there's an error, display the error message
    if (error) return <div>Xato: {error}</div>

    // Returning the list of categories
    return (
        <>
            <ul className='flex flex-col gap-[15px] px-[20px] pb-[20px]'>
                {
                    // Mapping through the category data to render each category item
                    data?.data?.map((item: any, index: number) => {
                        return (
                            <NavLink to={`children/${item.slug}`} key={index}>
                                <li style={theme == 'dark' ? { color: 'white', backgroundColor: '#27314a', borderColor: '#27314a' } : { color: '' }} className='flex items-center p-[10px] gap-[5px] rounded-[10px] border-[1px] border-slate-200 cursor-pointer'>
                                    <img className='w-[35px] h-[35px]' src={item.image} alt="" />
                                    <span>{item[`title_${lang}`]}</span>
                                </li>
                            </NavLink>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default Categories
