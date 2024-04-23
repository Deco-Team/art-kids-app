import { AspectRatio, Box, Center, HStack, Heading, Image, Pressable, Stack, Text, View } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { IOrderHistory } from '../business/course/course'

interface OrderHistoryCardProps {
  data: IOrderHistory
}

const OrderHistoryCard = ({ data }: OrderHistoryCardProps) => {
  const durationInHour =
    Math.floor(data.items[0].course.duration / 60) +
    (Math.floor(data.items[0].course.duration / 60) == 1 ? ' hour ' : ' hours ') +
    (data.items[0].course.duration % 60 > 0 ? (data.items[0].course.duration % 60) + ' mins' : '')
  return (
    <View alignItems='center' style={{ marginBottom: 20, marginHorizontal: 20 }}>
      <Pressable
        rounded='lg'
        overflow='hidden'
        borderColor='coolGray.200'
        shadow={'3'}
        borderWidth='1'
        _light={{
          backgroundColor: 'coolGray.50'
        }}
      >
        <Box>
          <Heading size={'sm'} fontWeight='bold' ml={4} height={'10'} style={{ textAlignVertical: 'center' }}>
            #{data.orderNumber}
          </Heading>
          <AspectRatio w='100%' ratio={16 / 9}>
            <Image
              source={{
                uri: data.items[0].course.thumbnail
              }}
              alt='image'
            />
          </AspectRatio>
          <Center
            bg='#3D5CFF'
            _text={{
              color: 'white',
              fontWeight: '700',
              fontSize: 'md'
            }}
            position='absolute'
            bottom='0'
            px='5'
            py='2'
            roundedTopRight={10}
          >
            {data.items[0].course.level}
          </Center>
        </Box>
        <Stack p='4' space={2}>
          <Stack space={2}>
            <Heading size='md'>
              {data.items[0].course.title}
            </Heading>
          </Stack>
          <HStack alignItems='center' space={4} justifyContent='space-between'>
            <HStack alignItems='center' justifyContent={'space-between'} width={'100%'}>
              <Text color='black' fontWeight='400' fontSize={'md'}>
                <MaterialCommunityIcons name='timer-sand' size={18} color='black' />
                {durationInHour}
              </Text>
              <Text color='black' fontWeight='bold' fontSize={'2xl'}>
                {Intl.NumberFormat('en-DE').format(data.totalAmount) + ' ₫'}
              </Text>
            </HStack>
          </HStack>
          <Text color='black' fontWeight='400' fontSize={'sm'}>
            {new Date(data.createdAt).toLocaleDateString().split('/').join('-') +
              ' ' +
              new Date(data.createdAt).toTimeString().slice(0, 5)}
          </Text>
        </Stack>
      </Pressable>
    </View>
  )
}

export default OrderHistoryCard
