import { useContext } from 'react'
import { Context } from '../../context/langContext'
import { ShoppingCartContext } from '../../context/shoppingCartContext'
import { content, ContentMap } from '../../localization/content'
import { SlBasket } from 'react-icons/sl'
import { GrDeliver } from "react-icons/gr"

function CategoriesItem() {

    const shoppingContext = useContext(ShoppingCartContext)
    const langContext = useContext(Context)

    if (!shoppingContext) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    if (!langContext) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    const { lang } = langContext

    const { addToCart } = shoppingContext

    const xabarlar = content[lang as keyof ContentMap]

    function formatUzbekSom(price: number) {
        // Sonni raqamlar orasida bo'shliqlar qo'yish
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    }

    return (
        <section className='p-[20px]'>
            <img src="https://app.orzugrand.uz/storage/uploads/products/1707800685dWfInyvMnXWmXdUt.png" alt="" />
            <div className='flex flex-col gap-[10px] items-start mb-[70px]'>
                <div className='text-[18px]'>Telefonlar HUAWEI Y 8 P</div>
                <div className='text-[18px] text-[#ffa500]'>{`${formatUzbekSom(1000000)} ${xabarlar.som}`}</div>
                <span className='text-[12px] bg-[#F16736] text-white p-[4px] rounded-[5px]'>{`${formatUzbekSom(90000)} ${xabarlar.som} * 1 oy`}</span>

                <div className='flex items-center gap-[5px] bg-green-500 text-white rounded-[5px] p-[4px] text-[12px]  mb-[8px]'><GrDeliver className='text-[#fff] text-[20px]' /> Доставка:</div>

                <div className='text-[22px] mb-[5px]'>Tavsifi</div>
                <p className='text-[14px] text-[#999]'>
                    Yupqa korpusdagi sig'imli batareya
                    Honor X7b: 6000 mA/soat batareya quvvatiga ega eng nozik va engil smartfon
                    Yupqa ramkalar va ergonomik dizayn
                    Qo'lingizdagi smartfonni qulay his qilish uchun orqa panel 63 daraja egilgan
                    Yon tomonda barmoq izlari skaneri
                    Xavfsiz va samarali. Tegish orqali qulfni oching
                    Surround ovoz effektiga ega stereo dinamiklar
                    2 karnay, 2 baravar ko'proq taassurot\
                    Stereo ovoz
                </p>
            </div>
            <div className='fixed flex items-center justify-between px-[20px] bottom-0 left-0 w-full h-[60px] bg-white border-t-[1px] border-slate-200'>
                <div className='text-[22px] font-bold text-[#ffa500]'>{`${formatUzbekSom(1000000)} ${xabarlar.som}`}</div>

                <button className='flex flex-col items-center justify-center text-[18px] w-[100px] h-[40px] text-green-500 border-[1px] border-green-500 rounded-[8px]' onClick={() => addToCart({})}>
                    <SlBasket />
                </button>
            </div>
        </section>
    )
}

export default CategoriesItem