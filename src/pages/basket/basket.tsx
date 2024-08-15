import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Buy } from '../../assets/ilustrations'
import { MdDeleteOutline } from "react-icons/md"
import { ShoppingCartContext, ContextType, CartItem, BasketItem } from '../../context/shoppingCartContext'
import useTelegramTheme from '../../hooks/useTelegramTheme'
import { Context } from '../../context/langContext'
import { content, ContentMap } from '../../localization/content'

interface LangContextType {
    lang: keyof ContentMap;
}

function Basket() {

    const navigate = useNavigate()

    const context = useContext(ShoppingCartContext)
    const langContext = useContext(Context) as LangContextType
    const theme = useTelegramTheme()

    if (!context || !langContext) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    const { lang } = langContext
    const { cartItems, basketItems, removeFromCart, updateBasketItem } = context

    console.log(basketItems);
    

    const messages = content[lang]

    function formatUzbekSom(price: number) {
        if (price >= 100000000) {
            return '100 000 000+'
        }
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }

    function calculateMonthlyPayment(price: number, term: number) {
        if (term === 0) return price;
        switch (term) {
            case 3:
                return price / 3;
            case 6:
                return (price * 1.2) / 6;
            case 9:
                return (price * 1.3) / 9;
            case 12:
                return (price * 1.4) / 12;
            default:
                return price;
        }
    }

    function handleTermChange(item: CartItem, term: number) {
        const monthlyPayment = calculateMonthlyPayment(item.price, term)
        updateBasketItem(item.slug, term, monthlyPayment)
    }

    function sum(items: BasketItem[]) {
        return items.reduce((total, item) => total + item.monthlyPayment * item.selectedTerm, 0);
    }

    useEffect(() => {
		const tg = window.Telegram.WebApp

		tg.BackButton.show()

		tg.BackButton.onClick(() => {
			navigate(-1)
		})

		return () => {
			tg.BackButton.hide()
		}
	}, [])

    return (
        <>
            {cartItems.length === 0 ? (
                <div className='flex flex-col items-center justify-center'>
                    <Buy />
                    <span style={theme === 'dark' ? { color: 'white' } : {}} className='text-center text-[22px] mb-[5px]'>{messages.buy1}</span>
                    <span style={theme === 'dark' ? { color: 'white' } : {}} className='mb-[10px]'>{messages.buy2}</span>
                    <NavLink to="/" className="bg-orange-500 px-[20px] py-[10px] rounded-[10px] text-white">
                        {messages.not_found_link}
                    </NavLink>
                </div>
            ) : (
                <>
                    <ul className='flex flex-col gap-[20px] p-[20px] mb-[110px]'>
                        {cartItems.map((item: CartItem) => {
                            const basketItem = basketItems.find(bi => bi.productSlug === item.slug)
                            return (
                                <li key={item.id} style={theme === 'dark' ? { backgroundColor: '#27314a', borderColor: '#27314a' } : {}} className='w-full flex gap-[10px] items-start relative p-[20px] rounded-[10px] border-[1px] border-slate-200'>
                                    <img className='w-[110px] h-[110px]' src={item.images[0].image} alt="" />
                                    <div>
                                        <div style={theme === 'dark' ? { color: 'white' } : {}}>{item[`title_${lang}`]}</div>
                                        <div className='text-[16px] text-[#ffa500]'>{`${formatUzbekSom(item.price)} ${messages.som}`}</div>
                                        <div>Slug: {item.slug}</div>
                                        <div className="flex mt-2">
                                            {[3, 6, 9, 12].map((month) => (
                                                <label key={month} className="inline-flex items-center mr-4">
                                                    <input
                                                        type="radio"
                                                        className="hidden"
                                                        name={`payment-${item.id}`}
                                                        value={month}
                                                        checked={basketItem?.selectedTerm === month}
                                                        onChange={() => handleTermChange(item, month)}
                                                    />
                                                    <span className={`px-3 py-1 rounded-full text-sm cursor-pointer ${basketItem?.selectedTerm === month
                                                        ? 'bg-orange-500 text-white'
                                                        : theme === 'dark'
                                                            ? 'bg-gray-700 text-white'
                                                            : 'bg-gray-200 text-gray-800'
                                                        } hover:bg-orange-500 hover:text-white transition-colors`}>
                                                        {month === 0 ? '' : `${month} ${messages.month}`}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                        {basketItem && basketItem.selectedTerm > 0 && (
                                            <div className='text-[14px] text-green-500 mt-2'>
                                                {`${messages.monthly}: ${formatUzbekSom(Math.round(basketItem.monthlyPayment))} ${messages.som}`}
                                            </div>
                                        )}
                                    </div>
                                    <button className='absolute right-[20px] bottom-[20px] text-[22px] text-red-500' onClick={() => removeFromCart(item.id)}>
                                        <MdDeleteOutline />
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                    <div style={theme === 'dark' ? { backgroundColor: '#27314a', borderColor: '#27314a' } : {}} className='fixed w-full bg-white bottom-0 left-0 border-t-[1px] border-slate-200'>
                        <div style={theme === 'dark' ? { color: 'white' } : {}} className='py-[15px] px-[20px] text-[20px]'>
                            {messages.all} <span className='text-[18px] text-[#ffa500]'>{`${formatUzbekSom(Math.round(sum(basketItems)))} ${messages.som}`}</span>
                        </div>
                        <NavLink className="inline-block w-full text-center bg-orange-500 px-[20px] py-[15px] text-white" to='/question'>
                            {messages.buy}
                        </NavLink>
                    </div>
                </>
            )}
        </>
    )
}

export default Basket