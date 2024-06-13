import { Badge, Select } from 'antd'
import { useContext } from 'react'
import { Context } from '../../context/langContext'
import ImgSiteLogo from '../../assets/logo.svg'
import { NavLink } from 'react-router-dom'
import { SlBasket } from "react-icons/sl"
import { ShoppingCartContext } from '../../context/shoppingCartContext'

function Header() {

    const { lang, setLang } = useContext(Context)
    const { cartItems } = useContext(ShoppingCartContext)

    const handleChange = (value: string) => {
        setLang(value)
    }

    return (
        <header className='flex items-center justify-between p-[20px] border-b-[1px] border-slate-200'>
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