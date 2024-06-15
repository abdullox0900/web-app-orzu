import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Loading from '../../components/loading/loading'
import { Context } from '../../context/langContext'
import useFetchData from '../../hooks/useFetchers'
import useTelegramTheme from '../../hooks/useTelegramTheme'

interface CategoryData {
    data: any
}

function Categories() {

    const langContext = useContext(Context)
    const theme = useTelegramTheme()


    if (!langContext) {
        throw new Error('useContext must be inside a Provider with a valid value')
    }

    const { data, loading, error } = useFetchData<CategoryData>('https://app.orzugrand.uz/api/frontend/categories')
    const { lang } = langContext

    if (loading) return <Loading />
    if (error) return <div>Xato: {error}</div>

    return (
        <>
            <ul className='flex flex-col gap-[15px] px-[20px] py-[20px]'>
                {
                    data?.data?.map((item: any, index: number) => {
                        return (
                            <NavLink to={`children/${item.slug}`} key={index}>
                                <li style={theme == 'dark' ? { color: 'white' } : { color: '' }} className='flex items-center p-[10px] gap-[5px] rounded-[10px] border-[1px] border-slate-200 cursor-pointer'>
                                    <img className='w-[35px] h-[35px]' src={item.image} alt="" />
                                    <span>{item[`title_${lang}`]}</span>
                                </li>
                            </NavLink>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default Categories