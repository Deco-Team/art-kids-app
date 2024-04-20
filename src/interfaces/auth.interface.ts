import { IUser } from './user.interface'

export interface IAuthContextProps {
  user: IUser | undefined
  idToken: string | null
  login: ({ email, password }: ILoginFormProps) => Promise<boolean>
  logout: () => Promise<void>
}

export interface ILoginFormProps {
  email: string
  password: string
}

export interface IRegisterFormProps {
  name: string
  email: string
  phone: string
  password: string
}
