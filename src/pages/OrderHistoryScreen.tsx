import { Flex, ScrollView, Text, View } from 'native-base'
import { SafeAreaView } from 'react-native'
import useOrder from '../hooks/api/useOrderApi'
import { useEffect, useState } from 'react'
import { IPagination } from '../interfaces/pagination.interface'
import { IOrderHistory } from '../business/course/course'
import OrderHistoryCard from '../components/OrderHistoryCard'

const OrderHistoryScreen = () => {
  const { getOrderHistory } = useOrder()

  const initialData = {
    docs: [],
    totalDocs: 0,
    offset: 0,
    limit: 0,
    totalPages: 0,
    page: 0,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null
  }

  const [data, setData] = useState<IPagination<IOrderHistory>>(initialData)

  const getAllData = async () => {
    try {
      const response = await getOrderHistory()
      if (response) {
        // console.log(response)
        setData(response || initialData)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAllData()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', paddingHorizontal: 20, paddingTop: 5, marginBottom: 20 }}>
        Order History
      </Text>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View>
          {data.docs.length ? (
            data.docs.map((order, index) => <OrderHistoryCard key={index} data={order} />)
          ) : (
            <Text style={{ fontSize: 20, fontWeight: '400', paddingBottom: 20 }}>No orders available</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default OrderHistoryScreen
