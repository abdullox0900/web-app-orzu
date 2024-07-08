import { Badge, Select } from 'antd' // Importing Badge and Select components from antd library
import { useContext } from 'react' // Importing useContext hook from React
import { SlBasket } from "react-icons/sl" // Importing basket icon from react-icons
import { NavLink } from 'react-router-dom' // Importing NavLink component from react-router-dom for navigation
import ImgSiteLogo from '../../assets/logo.svg' // Importing site logo image
import { Context } from '../../context/langContext' // Importing language context
import { ShoppingCartContext } from '../../context/shoppingCartContext' // Importing shopping cart context
import useTelegramTheme from '../../hooks/useTelegramTheme' // Importing custom hook for Telegram theme

// Header functional component
function Header() {

    // Using context to access shopping cart and language context
    const context = useContext(ShoppingCartContext)
    const langContext = useContext(Context)

    // Throwing error if context is not within provider
    if (!context) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    if (!langContext) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    const { lang, setLang } = langContext // Destructuring lang and setLang from language context
    const { cartItems } = context // Destructuring cartItems from shopping cart context

    // Function to handle language change
    const handleChange = (value: string) => {
        setLang(value)
    }

    const theme = useTelegramTheme() // Getting theme from custom Telegram theme hook

    // Returning header component with conditional styling based on theme
    return (
        <header style={theme == 'dark' ? { backgroundColor: '#27314a', borderBottomColor: '#27314a' } : { borderBottomColor: '#eeeeee' }} className='flex fixed top-0 left-0 w-full bg-white z-10 items-center justify-between p-[20px] border-b-[1px] border-slate-200'>
            {/* Logo navigation link */}
            <NavLink to="/">
                <img src={ImgSiteLogo} alt="Site Logo" width={150} height={150} />
            </NavLink>
            <div className='flex items-center gap-5'>
                {/* Language select dropdown */}
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
                {/* Basket icon with item count badge */}
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
