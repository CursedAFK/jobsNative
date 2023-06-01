import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { SIZES } from '../../../constants'
import styles from './tabs.style'

const TabButton = ({ name, activeTab, onHandleSearchType }) => (
	<TouchableOpacity
		style={styles.btn(name, activeTab)}
		onPress={onHandleSearchType}
	>
		<Text style={styles.btnText(name, activeTab)}>{name}</Text>
	</TouchableOpacity>
)

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
	return (
		<View style={styles.container}>
			<FlatList
				data={tabs}
				keyExtractor={item => item}
				renderItem={({ item }) => (
					<TabButton
						name={item}
						activeTab={activeTab}
						onHandleSearchType={() => setActiveTab(item)}
					/>
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ columnGap: SIZES.small / 2 }}
			/>
		</View>
	)
}

export default Tabs
