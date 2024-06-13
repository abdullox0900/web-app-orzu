import { useContext } from 'react'
import { MdDeleteOutline } from "react-icons/md"
import { NavLink } from 'react-router-dom'
import { Buy } from '../../assets/ilustrations'
import { Context } from '../../context/langContext'
import { ShoppingCartContext } from '../../context/shoppingCartContext'
import { content, ContentMap } from '../../localization/content'

interface Item {
    id: number
    price: number
    // Boshqa kerakli xususiyatlar
}

function Basket() {

    const context = useContext(ShoppingCartContext)
    const langContext = useContext(Context)

    if (!context) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    if (!langContext) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    const { lang } = langContext
    const { cartItems, removeFromCart } = context

    const xabarlar = content[lang as keyof ContentMap]

    function formatUzbekSom(price: number) {
        // Sonni raqamlar orasida bo'shliqlar qo'yish
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    }

    function sum(numbers: Item[]) {
        return numbers.reduce((total, num) => total + num.price, 0)
    }

    return (
        <>
            {
                cartItems.length == 0 ? (
                    <div className='flex flex-col items-center justify-center'>
                        <Buy />
                        <span className='text-center text-[22px] mb-[5px]'>{xabarlar.buy1}</span>
                        <span className='mb-[10px]'>{xabarlar.buy2}</span>
                        <NavLink to="/" className="bg-orange-500 px-[20px] py-[10px] rounded-[10px] text-white">
                            {xabarlar.not_found_link}
                        </NavLink>
                    </div>
                ) : (
                    <>
                        <ul className='flex flex-col gap-[20px] p-[20px]'>
                            {
                                cartItems.map((item, index) => {
                                    return (
                                        <li key={index} className='w-full flex gap-[10px] items-start relative p-[20px] rounded-[10px] border-[1px] border-slate-200'>
                                            <img className='w-[110px] h-[110px]' src={item.image} alt="" />
                                            <div>
                                                <div>{item[`title_${lang}`]}</div>
                                                <div className='text-[16px] text-[#ffa500]'>{`${formatUzbekSom(item.price)} ${xabarlar.som}`}</div>
                                            </div>
                                            <button className='absolute right-[20px] bottom-[20px] text-[22px] text-red-500' onClick={() => removeFromCart(item.id)}>
                                                <MdDeleteOutline />
                                            </button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div className='pl-[20px] text-[20px]'>Jami: <span className='text-[18px] text-[#ffa500]'>{`${formatUzbekSom(sum(cartItems))} ${xabarlar.som}`}</span></div>
                    </>
                )
            }
        </>
    )
}

export default Basket