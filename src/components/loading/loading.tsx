import useTelegramTheme from '../../hooks/useTelegramTheme'
import './loading.css'

function Loading() {

    const theme = useTelegramTheme()

    return (
        <div style={theme == 'dark' ? { backgroundColor: '#151a28' } : { backgroundColor: '' }} className='fixed top-0 left-0 w-full h-screen bg-white flex justify-center items-center'>
            <div className="simple-spinner">
                <span></span>
            </div>
        </div>
    )
}

export default Loading