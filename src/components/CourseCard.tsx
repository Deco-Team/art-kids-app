import { useNavigation } from '@react-navigation/native'
import { AspectRatio, Box, Center, HStack, Heading, Image, Pressable, Stack, Text } from 'native-base'
import { ICourse } from '../interfaces/course.interface'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface CourseCardProps {
  data: ICourse
}

const CourseCard = ({ data }: CourseCardProps) => {
  const navigation = useNavigation()
  const durationInHour =
    Math.floor(data.duration / 60) +
    (Math.floor(data.duration / 60) == 1 ? ' hour ' : ' hours ') +
    (data.duration % 60 > 0 ? (data.duration % 60) + ' mins' : '')

  return (
    <Box alignItems='center' style={{ marginBottom: 20 }}>
      <Pressable
        rounded='lg'
        overflow='hidden'
        borderColor='coolGray.200'
        shadow={'1'}
        borderWidth='1'
        _light={{
          backgroundColor: 'coolGray.50'
        }}
        _pressed={{ opacity: 0.8 }}
        onPress={() => navigation.navigate('Details', { id: data._id })}
      >
        <Box>
          <AspectRatio w='100%' ratio={16 / 9}>
            <Image
              source={{
                uri: data.thumbnail
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
            {data.level}
          </Center>
        </Box>
        <Stack p='4' space={3}>
          <Stack space={2}>
            <Heading size='md' ml='-1'>
              {data.title}
            </Heading>
            <Text fontSize='xs' color='#3D5CFF' fontWeight='500' ml='-0.5' mt='-1'>
              Teacher: {data.provider.name}
            </Text>
          </Stack>
          <Text fontWeight='400'>{data.description}</Text>
          <HStack alignItems='center' space={4} justifyContent='space-between'>
            <HStack alignItems='center' justifyContent={'space-between'} width={'100%'}>
              <Text color='black' fontWeight='400' fontSize={'md'}>
                <MaterialCommunityIcons name='timer-sand' size={18} color='black' />
                {durationInHour}
              </Text>
              {data.type === 'PAID' && (
                <Text color='black' fontWeight='bold' fontSize={'2xl'}>
                  {Intl.NumberFormat('en-DE').format(data.price) + ' ₫'}
                </Text>
              )}
            </HStack>
          </HStack>
        </Stack>
      </Pressable>
    </Box>
  )
}

export default CourseCard
