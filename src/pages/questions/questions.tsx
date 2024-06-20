import Form from '../../components/form/form'
import Loading from '../../components/loading/loading'
import useFetchData from '../../hooks/useFetchers'

interface CategoryData {
    data: any
}

function Questions() {

    const { data, loading, error } = useFetchData<CategoryData>(`https://web.app.orzugrand.uz/api/questions`)

    if (loading) return <Loading />
    if (error) return <div>Xato: {error}</div>

    return (
        <>
            <Form />
        </>
    )
}

export default Questions