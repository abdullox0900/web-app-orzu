import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Loading from '../components/loading/loading'
import { Context } from '../context/langContext'
import useFetchData from '../hooks/useFetchers'


function Categories() {

    const { data, loading, error } = useFetchData('https://app.orzugrand.uz/api/frontend/categories')
    const { lang } = useContext(Context)

    if (loading) return <Loading />
    if (error) return <div>Xato: {error}</div>

    return (
        <>
            <ul className='flex flex-col gap-[15px] px-[20px] py-[20px]'>
                {
                    data?.data?.map((item, index: number) => {
                        return (
                            <NavLink to={`children/${item.slug}`} key={index}>
                                <li className='flex items-center p-[10px] gap-[5px] rounded-[10px] border-[1px] border-slate-200 cursor-pointer'>
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