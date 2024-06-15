import { useContext } from 'react'
import { GrDeliver } from "react-icons/gr"
import { SlBasket } from 'react-icons/sl'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react"
import Loading from '../../components/loading/loading'
import { Context } from '../../context/langContext'
import { ShoppingCartContext } from '../../context/shoppingCartContext'
import useFetchData from '../../hooks/useFetchers'
import { content, ContentMap } from '../../localization/content'

import "swiper/css"

interface CategoryData {
    data: any
}

function CategoriesItem() {

    const shoppingContext = useContext(ShoppingCartContext)
    const langContext = useContext(Context)
    const { slug } = useParams()

    const { data, loading, error } = useFetchData<CategoryData>(`https://app.orzugrand.uz/api/frontend/products/view/${slug}`)

    const product = data?.data

    if (!shoppingContext) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    if (!langContext) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    if (loading) {
        return <Loading />
    }

    if (error || !data) {
        return <div>Xatolik yuz berdi: {error}</div> // Xatolik bo'lsa xato xabarni qaytarish
    }

    const { lang } = langContext

    const { addToCart } = shoppingContext

    const xabarlar = content[lang as keyof ContentMap]

    function formatUzbekSom(price: number) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    }

    console.log(data)


    return (
        <section className='p-[20px]'>
            <Swiper className="mySwiper mb-[25px]">
                {
                    product.images.map((item: any, index: number) => {
                        return (
                            <SwiperSlide key={index}>
                                <img className='w-full h-[500px] object-content' src={item.image} alt="" />
                            </SwiperSlide>
                        )
                    })
                }

            </Swiper>
            <div className='flex flex-col gap-[10px] items-start mb-[70px]'>
                <div className='text-[18px]'>{product[`title_${lang}`]}</div>
                <div className='text-[18px] text-[#ffa500]'>{`${formatUzbekSom(product.price)} ${xabarlar.som}`}</div>
                <span className='text-[12px] bg-[#F16736] text-white p-[4px] rounded-[5px]'>{`${formatUzbekSom(product.monthly_pay)} ${xabarlar.som} * 1 oy`}</span>

                <div className='flex items-center gap-[5px]'>
                    <div className='flex items-center gap-[5px] bg-green-500 text-white rounded-[5px] p-[4px] text-[12px]  mb-[8px]'><GrDeliver className='text-[#fff] text-[20px]' />{product.delivery_information[`name_${lang}`]}:</div>
                    <span className='text-[14px] text-gray-500'>{product.delivery_information[`short_description_${lang}`]}</span>
                </div>

                <div className='text-[22px] mb-[5px]'>Tavsifi</div>
                <p className='text-[14px] text-[#999]'>{product[`description_${lang}`]}</p>
            </div>
            <div className='fixed flex items-center justify-between px-[20px] bottom-0 left-0 w-full h-[60px] bg-white border-t-[1px] border-slate-200'>
                <div className='text-[22px] font-bold text-[#ffa500]'>{`${formatUzbekSom(product.price)} ${xabarlar.som}`}</div>

                <button className='flex flex-col items-center justify-center text-[18px] w-[100px] h-[40px] text-green-500 border-[1px] border-green-500 rounded-[8px]' onClick={() => addToCart(product)}>
                    <SlBasket />
                </button>
            </div>
        </section>
    )
}

export default CategoriesItem