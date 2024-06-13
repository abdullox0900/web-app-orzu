// src/hooks/useFetchData.js
import { useEffect, useState } from 'react'

const useFetchData = (url: string) => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			try {
				const response = await fetch(url)
				if (!response.ok) {
					throw new Error('Tarmoq xatosi')
				}
				const result = await response.json()
				setData(result)
			} catch (err) {
				setError('Xatoli!')
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [url])

	return { data, loading, error }
}

export default useFetchData
