import { Box, Flex, IconButton, Pressable, Progress, Text } from 'native-base'
import { ICourse } from '../interfaces/course.interface'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

interface IMyCourseCardProps {
  data: ICourse
  index: number
}

const MyCourseCard = ({ data, index }: IMyCourseCardProps) => {
  const navigation = useNavigation()
  const progress = ((data?.completedLessons || 0) / (data?.totalLessons || 1)) * 100
  const color = ['#FFE7EE', '#BAD6FF', '#BAE0DB']
  const colorPress = ['#fcc1d2', '#9fc3f8', '#aef4ea']
  const colorText = ['#EC7B9C', '#3D5CFF', '#398A80']
  return (
    <Pressable onPress={() => navigation.navigate('MyCourseDetails', { id: data._id })}>
      {({ isPressed }) => {
        return (
          <Box
            width={'100%'}
            bg={isPressed ? colorPress[index % 3] : color[index % 3]}
            p='5'
            rounded='10'
            style={{
              transform: [
                {
                  scale: isPressed ? 0.99 : 1
                }
              ]
            }}
          >
            <Text color='coolGray.800' fontWeight='bold' fontSize='md' mb={2}>
              {data.title}
            </Text>
            <Progress
              value={progress}
              mx='4'
              colorScheme={'blue'}
              width={'100%'}
              _filledTrack={{
                backgroundColor: colorText[index % 3]
              }}
              backgroundColor={'white'}
              style={{
                marginLeft: 0
              }}
              mb={2}
            />
            <Text color='coolGray.800' fontWeight='medium' fontSize='xs' mb={2}>
              Completed
            </Text>
            <Flex flexDir={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Text color='coolGray.800' fontWeight='extrabold' fontSize='2xl'>
                {data?.completedLessons || 0}/{data?.totalLessons || 0}
              </Text>
              <IconButton
                backgroundColor={colorText[index % 3]}
                variant={'solid'}
                borderRadius={'full'}
                disabled
                style={{ aspectRatio: 1, width: 44, alignItems: 'center', justifyContent: 'center' }}
                icon={<Ionicons name='play' color='white' size={16} />}
              />
            </Flex>
          </Box>
        )
      }}
    </Pressable>
  )
}

export default MyCourseCard
