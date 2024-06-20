import { useContext, useEffect, useState } from 'react'
import { MdDeleteOutline } from "react-icons/md"
import { NavLink } from 'react-router-dom'
import { Buy } from '../../assets/ilustrations'
import { Context } from '../../context/langContext'
import { ShoppingCartContext } from '../../context/shoppingCartContext'
import useTelegramTheme from '../../hooks/useTelegramTheme'
import { content, ContentMap } from '../../localization/content'

interface Item {
    id: number
    price: number
}

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

    const xabarlar = content[lang as keyof ContentMap]

    function formatUzbekSom(price: number) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    }

    function sum(numbers: Item[]) {
        return numbers.reduce((total, num) => total + num.price, 0)
    }

    function productSlugs(data: any) {
        return data.map((item: any) => item.slug).join(' ')
    }

    const [chatId, setChatId] = useState<string | null>(null)

    useEffect(() => {
        const tg = window.Telegram.WebApp
        tg.MainButton.text = "Changed Text"
        if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
            setChatId(tg.initDataUnsafe.user.id)
        }
    }, [])

    const sendMessage = () => {
        // Telegram Web App orqali ma'lumotni yuborish
        window.Telegram.WebApp.sendData('salom')
    }

    const sendMessageToBot = async (data: any) => {
        const botToken = '6247211570:AAHvObLvBcJRuMs27cONqiTTQB1vz9P2Tn0'  // Bu yerga o'z bot tokeningizni qo'ying

        const url = `https://api.telegram.org/bot${botToken}/sendMessage`

        const payload = {
            chat_id: chatId,
            text: JSON.stringify(data),
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })

            const data = await response.json()
            if (data.ok) {
                console.log('Message sent successfully')
                window.Telegram.WebApp.close()
            } else {
                console.error('Error sending message', data)
            }
        } catch (error) {
            console.error('Error sending message', error)
        }
    }

    const handleButtonClick = () => {
        sendMessage()
        // sendMessageToBot(productSlugs(cartItems))
    }

    return (
        <>
            {
                cartItems.length == 0 ? (
                    <div className='flex flex-col items-center justify-center'>
                        <Buy />
                        <span style={theme == 'dark' ? { color: 'white' } : {}} className='text-center text-[22px] mb-[5px]'>{xabarlar.buy1}</span>
                        <span style={theme == 'dark' ? { color: 'white' } : {}} className='mb-[10px]'>{xabarlar.buy2}</span>
                        <NavLink to="/" className="bg-orange-500 px-[20px] py-[10px] rounded-[10px] text-white">
                            {xabarlar.not_found_link}
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
                        <div style={theme == 'dark' ? { backgroundColor: '#27314a', borderColor: '#27314a' } : {}} className='fixed w-full bg-white bottom-0 left-0 border-t-[1px] border-slate-200'>
                            <div style={theme == 'dark' ? { color: 'white' } : {}} className='py-[15px] px-[20px] text-[20px]'>{xabarlar.all} <span className='text-[18px] text-[#ffa500]'>{`${formatUzbekSom(sum(cartItems))} ${xabarlar.som}`}</span></div>
                            <NavLink className="inline-block w-full text-center bg-orange-500 px-[20px] py-[15px] text-white" to='/question'>
                                {xabarlar.buy}
                            </NavLink>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Basket