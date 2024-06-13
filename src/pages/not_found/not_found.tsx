import { NavLink } from 'react-router-dom'
import { NotFoundIl } from '../../assets/ilustrations'

function NotFound() {
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-white flex flex-col items-center justify-center'>
            <NotFoundIl />
            <div>
                <span>Sahifa topilmadi <NavLink to={'/'} className="text-orange-500 hover:underline">Bosh sahifaga qaytish</NavLink></span>
            </div>
        </div>
    )
}

export default NotFound