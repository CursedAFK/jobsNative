import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
	ActivityIndicator,
	FlatList,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import { COLORS, SIZES } from '../../../constants'
import { useFetch } from '../../../hook/useFetch'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import styles from './popularjobs.style'

const Popularjobs = () => {
	const [selectedJob, setSelectedJob] = useState(null)

	const { data, error, isLoading, refetchData } = useFetch('search', {
		query: 'React developer',
		num_pages: 1
	})

	const router = useRouter()

	const handleCardPress = job => {
		setSelectedJob(job.job_id)
		router.push(`/job-details/${job?.job_id}`)
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Popularjobs</Text>
				<TouchableOpacity>
					<Text style={styles.headerBtn}>Show all</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.cardsContainer}>
				{isLoading ? (
					<ActivityIndicator size='large' color={COLORS.primary} />
				) : error ? (
					<Text>Something went wrong</Text>
				) : (
					<FlatList
						data={data}
						renderItem={({ item }) => (
							<PopularJobCard
								item={item}
								handleCardPress={handleCardPress}
								selectedJob={selectedJob}
							/>
						)}
						keyExtractor={item => item?.job_id}
						contentContainerStyle={{
							columnGap: SIZES.medium
						}}
						horizontal
					/>
				)}
			</View>
		</View>
	)
}

export default Popularjobs
