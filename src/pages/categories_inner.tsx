import { useContext } from 'react'
import { SlBasket } from "react-icons/sl"
import { useParams } from 'react-router-dom'
import { NoProduct } from '../assets/ilustrations'
import Loading from '../components/loading/loading'
import { Context } from '../context/langContext'
import { ShoppingCartContext } from '../context/shoppingCartContext'
import useFetchData from '../hooks/useFetchers'
import { content, ContentMap } from '../localization/content'

interface CategoryData {
    data: any
}

function CategoriesInner() {

    const context = useContext(ShoppingCartContext)
    const langContext = useContext(Context)

    if (!context) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    if (!langContext) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    const { lang } = langContext
    const { slug } = useParams()
    const { addToCart } = context

    const xabarlar = content[lang as keyof ContentMap]

    const { data, loading, error } = useFetchData<CategoryData>(`https://app.orzugrand.uz/api/frontend/products/${slug}`)

    if (loading) {
        return <Loading />
    }

    if (error || !data) {
        return <div>Xatolik yuz berdi: {error}</div> // Xatolik bo'lsa xato xabarni qaytarish
    }

    function formatUzbekSom(price: number) {
        // Sonni raqamlar orasida bo'shliqlar qo'yish
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
                    <ul className='grid grid-cols-2 gap-4 px-[20px] py-[20px]'>
                        {
                            data?.data?.map((item: any, index: number) => {
                                return (
                                    <li key={index} className='flex flex-col gap-[8px] items-start p-[10px] rounded-[10px] border-[1px] border-[#ffa500] cursor-pointer h-[290px] transition duration-500 ease-in-out hover:border-[#ffa500]'>
                                        <img className='w-[110px] h-[110px] mx-auto mb-[10px]' src={item.image} alt="" />
                                        <div className='text-left text-[16px]'>{item[`title_${lang}`].length > 16 ? item[`title_${lang}`].slice(0, 16) + '...' : item[`title_${lang}`]}</div>
                                        <div className='text-[16px] text-[#ffa500]'>{`${formatUzbekSom(item.price)} ${xabarlar.som}`}</div>
                                        <span className='text-[11px] bg-[#F16736] p-[4px] rounded-[5px] mb-[8px]'>{`${formatUzbekSom(item.monthly_pay)} ${xabarlar.som} * 1 oy`}</span>
                                        <button className='flex flex-col items-center justify-center text-[18px] w-full h-[40px] text-[#ffa500] border-[1px] border-[#ffa500] rounded-[8px]' onClick={() => addToCart(item)}>
                                            <SlBasket />
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            }

        </>
    )
}

export default CategoriesInner