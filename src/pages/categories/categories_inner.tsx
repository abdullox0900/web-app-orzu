import { useContext } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { NoProduct } from '../../assets/ilustrations'
import Loading from '../../components/loading/loading'
import { Context } from '../../context/langContext'
import { ShoppingCartContext } from '../../context/shoppingCartContext'
import useFetchData from '../../hooks/useFetchers'
import useTelegramTheme from '../../hooks/useTelegramTheme'
import { content, ContentMap } from '../../localization/content'

interface CategoryData {
    data: any
}

function CategoriesInner() {

    const langContext = useContext(Context)
    const shoppingContext = useContext(ShoppingCartContext)
    const theme = useTelegramTheme()
    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1) // Bu oldingi sahifaga qaytaradi
    }

    if (!langContext) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    if (!shoppingContext) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    const { lang } = langContext
    const { slug } = useParams()

    const xabarlar = content[lang as keyof ContentMap]

    const { data, loading, error } = useFetchData<CategoryData>(`https://app.orzugrand.uz/api/frontend/products/${slug}`)

    if (loading) {
        return <Loading />
    }

    if (error || !data) {
        return <div>Xatolik yuz berdi: {error}</div>
    }

    function formatUzbekSom(price: number) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    }

    return (
        <>
            {
                data?.data.length == 0 ? (
                    <div className='flex flex-col items-center justify-center'>
                        <NoProduct />
                        <div>{xabarlar.no_product}</div>
                    </div>
                ) : (
                    <>
                        <button onClick={goBack} style={theme == 'dark' ? { backgroundColor: '#27314a', color: 'white', borderColor: '#27314a' } : {}} className="flex items-center justify-center w-[40px] h-[40px] border-[1px] border-slate-200 rounded-full m-[20px]">
                            <FaArrowLeft />
                        </button>
                        <ul className='grid grid-cols-2 gap-4 px-[20px] pb-[20px]'>
                            {
                                data?.data?.map((item: any, index: number) => {
                                    return (
                                        <NavLink key={index} to={`/children_item/${item.slug}`}>
                                            <li style={theme == 'dark' ? { backgroundColor: '#27314a', borderColor: '#27314a' } : {}} className='flex flex-col gap-[8px] items-start p-[10px] rounded-[10px] border-[1px] border-slate-200 cursor-pointer h-[240px] transition duration-500 ease-in-out hover:border-[#ffa500]'>
                                                <img className='w-[110px] h-[110px] mx-auto mb-[10px]' src={item.image} alt="" />
                                                <div style={theme == 'dark' ? { color: 'white' } : {}} className='text-left text-[16px]'>{item[`title_${lang}`].length > 14 ? item[`title_${lang}`].slice(0, 14) + '...' : item[`title_${lang}`]}</div>
                                                <div className='text-[16px] text-[#ffa500]'>{`${formatUzbekSom(item.price)} ${xabarlar.som}`}</div>
                                                <span className='text-[11px] bg-[#F16736] text-white p-[4px] rounded-[5px] mb-[8px]'>{`${formatUzbekSom(item.monthly_pay)} ${xabarlar.som} * 1 oy`}</span>
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