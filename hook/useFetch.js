import { useState, useEffect } from 'react'
import axios from 'axios'
// import { RAPID_API_KEY } from '@env'

// const rapidApiKey = RAPID_API_KEY

export const useFetch = (endpoint, query) => {
	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	const options = {
		method: 'GET',
		url: `https://jsearch.p.rapidapi.com/${endpoint}`,
		headers: {
			'X-RapidAPI-Key': '911e4b4f53msh882cbff9aca1f17p10525fjsna99b66984547',
			'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
		},
		params: { ...query }
	}

	const fetchData = async () => {
		setIsLoading(true)

		try {
			const response = await axios.request(options)
			setData(response.data.data)
		} catch (error) {
			setError(error)
			console.log('There was an error fetching data')
		} finally {
			setIsLoading(false)
		}
	}

	const refetchData = () => {
		fetchData()
	}

	useEffect(() => {
		fetchData()
	}, [])

	return {
		data,
		isLoading,
		error,
		refetchData
	}
}
