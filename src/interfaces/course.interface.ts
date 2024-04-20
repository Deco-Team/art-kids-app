export interface ICourse {
  _id: string
  title: string
  description: string
  objective: string
  thumbnail: string
  duration: number
  price: number
  level: string
  status: string
  lessons?: ILesson[]
  createdAt: Date
  updatedAt: Date
  provider: IProvider
  type: string
}

export interface IProvider {
  _id: string
  name: string
  image: string
}

export interface ILesson {
  title: string
  description: string
  objective: string
  video: string
  type: string
}
