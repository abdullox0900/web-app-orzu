import useTelegramTheme from '../../hooks/useTelegramTheme' // Importing custom hook for Telegram theme
import './loading.css' // Importing CSS file for loading spinner styles

// Loading functional component
function Loading() {

    const theme = useTelegramTheme() // Getting theme from custom Telegram theme hook

    // Returning loading spinner with conditional styling based on theme
    return (
        <div style={theme == 'dark' ? { backgroundColor: '#151a28' } : { backgroundColor: '' }} className='fixed top-0 left-0 w-full h-screen bg-white flex justify-center items-center'>
            <div className="simple-spinner">
                <span></span>
            </div>
        </div>
    )
}

export default Loading
