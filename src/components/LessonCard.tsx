import { IconButton, Pressable } from 'native-base'
import { Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ILesson, CourseType } from '../business/course/course'

interface LessonCardProps {
  isPLaying: boolean
  index: number
  data: ILesson | undefined
  buttonIsPlaying: boolean
  tooglePlaying: () => void
  fromMyCourse?: boolean
}

const LessonCard = (data: LessonCardProps) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '600',
            color: data.isPLaying ? 'black' : '#B8B8D2',
            marginVertical: 5,
            marginRight: 20
          }}
        >
          {data.index + 1}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: data.isPLaying ? 'bold' : '400',
            color: data.isPLaying ? '#3D5CFF' : 'black'
          }}
        >
          {data.data?.title}
        </Text>
      </View>
      <IconButton
        backgroundColor={'#3D5CFF'}
        variant={'solid'}
        borderRadius={'full'}
        _pressed={{ opacity: 0.6 }}
        style={{ aspectRatio: 1, width: 44, alignItems: 'center', justifyContent: 'center' }}
        onPress={() => data.tooglePlaying()}
        icon={
          data.data?.type === CourseType.PAID && !data.fromMyCourse ? (
            <Ionicons name='lock-closed' size={24} color='white' />
          ) : data.buttonIsPlaying && data.isPLaying ? (
            <Ionicons name='pause' color='white' size={16} />
          ) : (
            <Ionicons name='play' color='white' size={16} />
          )
        }
      />
    </View>
  )
}

export default LessonCard
