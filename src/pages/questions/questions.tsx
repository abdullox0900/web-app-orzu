import Form from '../../components/form/form' // Importing Form component
import Loading from '../../components/loading/loading' // Importing Loading component
import useFetchData from '../../hooks/useFetchers' // Importing custom hook to fetch data
import { CategoryData } from '../../types/types' // Importing type for category data

// Functional component Questions
function Questions() {
    // Using custom hook to fetch data from API
    const { loading, error } = useFetchData<CategoryData>('https://shop-bot.orzugrand.uz/api/questions')

    // If data is loading, render the Loading component
    if (loading) return <Loading />
    // If there's an error, display the error message
    if (error) return <div>Xato: {error}</div>

    // If data is fetched successfully, render the Form component
    return (
        <>
            <Form />
        </>
    )
}

export default Questions
