// Import React and React-router
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'

// Images
import { Buy } from '../../assets/ilustrations'

// React-Icons
import { MdDeleteOutline } from "react-icons/md"

// Import Shopping Context
import { ShoppingCartContext } from '../../context/shoppingCartContext'

// Import Hook
import useTelegramTheme from '../../hooks/useTelegramTheme'

// Import Localization Content and Context
import { Context } from '../../context/langContext'
import { content, ContentMap } from '../../localization/content'
import { Item } from '../../types/types'

function Basket() {

    const context = useContext(ShoppingCartContext)
    const langContext = useContext(Context)
    const theme = useTelegramTheme()

    if (!context) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    if (!langContext) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    const { lang } = langContext
    const { cartItems, removeFromCart } = context

    const messages = content[lang as keyof ContentMap]

    function formatUzbekSom(price: number) {
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
                        <span style={theme == 'dark' ? { color: 'white' } : {}} className='text-center text-[22px] mb-[5px]'>{messages.buy1}</span>
                        <span style={theme == 'dark' ? { color: 'white' } : {}} className='mb-[10px]'>{messages.buy2}</span>
                        <NavLink to="/" className="bg-orange-500 px-[20px] py-[10px] rounded-[10px] text-white">
                            {messages.not_found_link}
                        </NavLink>
                    </div>
                ) : (
                    <>
                        <ul className='flex flex-col gap-[20px] p-[20px] mb-[110px]'>
                            {
                                cartItems.map((item, index) => {
                                    return (
                                        <li key={index} style={theme == 'dark' ? { backgroundColor: '#27314a', borderColor: '#27314a' } : {}} className='w-full flex gap-[10px] items-start relative p-[20px] rounded-[10px] border-[1px] border-slate-200'>
                                            <img className='w-[110px] h-[110px]' src={item.images[0].image} alt="" />
                                            <div>
                                                <div style={theme == 'dark' ? { color: 'white' } : {}}>{item[`title_${lang}`]}</div>
                                                <div className='text-[16px] text-[#ffa500]'>{`${formatUzbekSom(item.price)} ${messages.som}`}</div>
                                            </div>
                                            <button className='absolute right-[20px] bottom-[20px] text-[22px] text-red-500' onClick={() => removeFromCart(item.id)}>
                                                <MdDeleteOutline />
                                            </button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div style={theme == 'dark' ? { backgroundColor: '#27314a', borderColor: '#27314a' } : {}} className='fixed w-full bg-white bottom-0 left-0 border-t-[1px] border-slate-200'>
                            <div style={theme == 'dark' ? { color: 'white' } : {}} className='py-[15px] px-[20px] text-[20px]'>{messages.all} <span className='text-[18px] text-[#ffa500]'>{`${formatUzbekSom(sum(cartItems))} ${messages.som}`}</span></div>
                            <NavLink className="inline-block w-full text-center bg-orange-500 px-[20px] py-[15px] text-white" to='/question'>
                                {messages.buy}
                            </NavLink>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Basket