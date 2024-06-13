// hooks/useFetchData.ts
import { useState, useEffect } from 'react'

// Ma'lumotlar strukturasini aniqlash uchun interfeys
interface FetchData<T> {
	data: T | null
	loading: boolean
	error: string | null
}

const useFetchData = <T,>(url: string): FetchData<T> => {
	const [data, setData] = useState<T | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url)
				if (!response.ok) {
					throw new Error('Ma\'lumotlarni yuklashda xatolik yuz berdi.')
				}
				const result = await response.json()
				setData(result)
			} catch (error) {
				setError('Ma\'lumotlarni yuklashda xatolik yuz berdi.')
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [url])

	return { data, loading, error }
}

export default useFetchData
