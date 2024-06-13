import { NavLink, useParams } from 'react-router-dom'
import useFetchData from '../hooks/useFetchers'
import { Context } from '../context/langContext'
import { useContext } from 'react'
import Loading from '../components/loading/loading'

function CategoriesChildren() {

    const { slug } = useParams()
    const { lang } = useContext(Context)

    const { data, loading, error } = useFetchData(`https://app.orzugrand.uz/api/frontend/categories/${slug}`)

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <ul className='grid grid-cols-2 gap-4 px-[20px] py-[20px]'>
                {
                    data?.data?.children?.map((item, index: number) => {
                        return (
                            <NavLink to={`/children_inner/${item.slug}`} key={index}>
                                <li className='flex flex-col items-center p-[10px] gap-[5px] rounded-[10px] border-[1px] border-slate-200 cursor-pointer  duration-500 ease-in-out hover:border-[#ffa500]'>
                                    <img className='w-[100px] h-[80px]' src={item.image} alt="" />
                                    <span>{item[`title_${lang}`].length > 20 ? item[`title_${lang}`].slice(0, 20) + '...' : item[`title_${lang}`]}</span>
                                </li>
                            </NavLink>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default CategoriesChildren