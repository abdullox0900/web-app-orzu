import { NavLink } from 'react-router-dom' // Importing NavLink component for navigation
import { NotFoundIl } from '../../assets/ilustrations' // Importing NotFound illustration
import useTelegramTheme from '../../hooks/useTelegramTheme' // Importing custom hook for Telegram theme

// Functional component NotFound
function NotFound() {

    const theme = useTelegramTheme() // Getting theme from custom Telegram theme hook

    // Returning NotFound page with conditional styling based on theme
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-white flex flex-col items-center justify-center'>
            {/* Displaying the NotFound illustration */}
            <NotFoundIl />
            <div>
                <span style={theme == 'dark' ? { color: 'white' } : {}}>
                    Sahifa topilmadi
                    {/* Navigation link to return to the homepage */}
                    <NavLink to={'/'} className="text-orange-500 hover:underline">
                        Bosh sahifaga qaytish
                    </NavLink>
                </span>
            </div>
        </div>
    )
}

export default NotFound
