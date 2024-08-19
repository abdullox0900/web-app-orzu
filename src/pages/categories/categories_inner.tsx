import { useContext } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { NoProduct } from '../../assets/ilustrations'
import Loading from '../../components/loading/loading'
import TelegramBackButton from '../../components/TelegramBackButton/TelegramBackButton'
import { Context } from '../../context/langContext'
import { ShoppingCartContext } from '../../context/shoppingCartContext'
import useFetchData from '../../hooks/useFetchers'
import useTelegramTheme from '../../hooks/useTelegramTheme'
import { content, ContentMap } from '../../localization/content'

interface CategoryData {
    data: any
}

function formatUzbekSom(price: number) {
  // Round to the nearest thousand
  const roundedPrice = Math.round(price / 1000) * 1000;
  
  // Convert to string and add space separators
  return roundedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function CategoriesInner() {
    const navigate = useNavigate()
    const langContext = useContext(Context)
    const shoppingContext = useContext(ShoppingCartContext)
    const theme = useTelegramTheme()

    const goBack = () => {
        navigate(-1)
    }

    if (!langContext || !shoppingContext) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    const { lang } = langContext
    const { slug } = useParams()

    const messages = content[lang as keyof ContentMap]

    const { data, loading, error } = useFetchData<CategoryData>(`https://app.orzugrand.uz/api/frontend/products/${slug}`)

    if (loading) {
        return <Loading />
    }

    if (error || !data) {
        return <div>Xatolik yuz berdi: {error}</div>
    }

    return (
        <>
            <TelegramBackButton />

            {
                data?.data.length == 0 ? (
                    <div className='flex flex-col items-center justify-center'>
                        <NoProduct />
                        <div>{messages.no_product}</div>
                    </div>
                ) : (
                    <>
                        <ul className='grid grid-cols-2 gap-4 px-[20px] pb-[20px]'>
                            {
                                data?.data?.map((item: any, index: number) => {
                                    return (
                                        <NavLink key={index} to={`/children_item/${item.slug}`}>
                                            <li style={theme == 'dark' ? { backgroundColor: '#27314a', borderColor: '#27314a' } : {}} className='flex flex-col gap-[8px] items-start p-[10px] rounded-[10px] border-[1px] border-slate-200 cursor-pointer h-[240px] transition duration-500 ease-in-out hover:border-[#ffa500]'>
                                                <img className='w-[110px] h-[110px] mx-auto mb-[10px]' src={item.image} alt="" />
                                                <div style={theme == 'dark' ? { color: 'white' } : {}} className='text-left text-[16px]'>{item[`title_${lang}`].length > 14 ? item[`title_${lang}`].slice(0, 14) + '...' : item[`title_${lang}`]}</div>
                                                <div className='text-[16px] text-[#ffa500]'>{`${formatUzbekSom(item.price)} ${messages.som}`}</div>
                                                <span className='text-[11px] bg-[#F16736] text-white p-[4px] rounded-[5px] mb-[8px]'>
                                                    {`${formatUzbekSom(Math.round((item.price * 1.40) / 12))} ${messages.som} x 12 oy`}
                                                </span>
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