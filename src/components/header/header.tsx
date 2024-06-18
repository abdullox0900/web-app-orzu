import { Badge, Select } from 'antd'
import { useContext } from 'react'
import { SlBasket } from "react-icons/sl"
import { NavLink } from 'react-router-dom'
import ImgSiteLogo from '../../assets/logo.svg'
import { Context } from '../../context/langContext'
import { ShoppingCartContext } from '../../context/shoppingCartContext'
import useTelegramTheme from '../../hooks/useTelegramTheme'

function Header() {

    const context = useContext(ShoppingCartContext)
    const langContext = useContext(Context)

    if (!context) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    if (!langContext) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    const { lang, setLang } = langContext
    const { cartItems } = context

    const handleChange = (value: string) => {
        setLang(value)
    }

    const theme = useTelegramTheme()


    return (
        <header style={theme == 'dark' ? { backgroundColor: '#27314a', borderBottomColor: '#27314a' } : { borderBottomColor: '#eeeeee' }} className='flex fixed top-0 left-0 w-full bg-white z-10 items-center justify-between p-[20px] border-b-[1px] border-slate-200'>
            <NavLink to="/">
                <img src={ImgSiteLogo} alt="" width={150} height={150} />
            </NavLink>
            <div className='flex items-center gap-5'>
                <Select
                    defaultValue={lang}
                    style={{ width: 60 }}
                    onChange={handleChange}
                    options={[
                        { value: 'uz', label: 'Uz' },
                        { value: 'ru', label: 'Ru' },
                        { value: 'uzc', label: 'Уз' },
                    ]}
                />
                <NavLink to='basket'>
                    <Badge count={cartItems.length}>
                        <SlBasket className='text-[25px] text-[#d9d9d9]' />
                    </Badge>
                </NavLink>
            </div>
        </header>
    )
}

export default Header