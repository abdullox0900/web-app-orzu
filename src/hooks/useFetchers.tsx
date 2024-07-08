// hooks/useFetchData.ts
import { useEffect, useState } from 'react'

// Defining an interface for the fetched data structure
interface FetchData<T> {
	data: T | null
	loading: boolean
	error: string | null
}

// Custom hook to fetch data from a given URL
const useFetchData = <T,>(url: string): FetchData<T> => {
	const [data, setData] = useState<T | null>(null) // State to store the fetched data
	const [loading, setLoading] = useState<boolean>(true) // State to track the loading status
	const [error, setError] = useState<string | null>(null) // State to store any errors

	// useEffect hook to fetch data when the URL changes
	useEffect(() => {
		// Async function to fetch data from the given URL
		const fetchData = async () => {
			try {
				const response = await fetch(url) // Fetching data from the URL
				if (!response.ok) {
					// Throwing an error if the response is not ok
					throw new Error('Ma\'lumotlarni yuklashda xatolik yuz berdi.')
				}
				const result = await response.json() // Parsing the JSON response
				setData(result) // Setting the fetched data to state
			} catch (error) {
				// Setting the error state if an error occurs
				setError('Ma\'lumotlarni yuklashda xatolik yuz berdi.')
			} finally {
				// Setting the loading state to false after the fetch completes
				setLoading(false)
			}
		}

		fetchData() // Calling the fetchData function
	}, [url]) // Dependency array to re-run the effect when the URL changes

	// Returning the data, loading, and error states
	return { data, loading, error }
}

export default useFetchData
