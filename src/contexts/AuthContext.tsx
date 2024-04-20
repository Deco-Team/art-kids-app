import { jwtDecode } from 'jwt-decode'
import { createContext, useEffect, useState } from 'react'
import { POST } from '../utils/api.caller'
import { useNavigation } from '@react-navigation/native'
import { IUser } from '../interfaces/user.interface'
import { IAuthContextProps, ILoginFormProps } from '../interfaces/auth.interface'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AxiosError } from 'axios'

const initialContext: IAuthContextProps = {
  user: {
    side: '',
    iat: 0,
    exp: 0,
    name: '',
    sub: ''
  },
  idToken: null,
  login: () => Promise.resolve(false),
  logout: async () => {
    return
  }
}

export const AuthContext = createContext<IAuthContextProps>(initialContext)

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [idToken, setIdToken] = useState<string | null>(null)
  const [user, setUser] = useState<IUser | undefined>()
  const navigation = useNavigation()

  useEffect(() => {
    ;(async () => {
      try {
        const storedToken = (await AsyncStorage.getItem('idToken')) || ''
        console.log(storedToken)
        if (storedToken) {
          setIdToken(storedToken)
          const decodedToken = jwtDecode(storedToken) as IUser
          setUser({
            side: decodedToken.side as string,
            iat: decodedToken.iat as number,
            exp: decodedToken.exp as number,
            name: decodedToken.name as string,
            sub: decodedToken.sub as string
          })
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  useEffect(() => {
    if (idToken) {
      try {
        const decodedToken = jwtDecode(idToken) as IUser
        if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' as never }]
          })
        } else
          setUser({
            side: decodedToken.side as string,
            iat: decodedToken.iat as number,
            exp: decodedToken.exp as number,
            name: decodedToken.name as string,
            sub: decodedToken.sub as string
          })
      } catch (error) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' as never }]
        })
      }
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' as never }]
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToken])

  initialContext.login = async ({ email, password }: ILoginFormProps) => {
    try {
      const { data } = await POST('auth/customer/login', { email, password }, {}, {})
      const token = data.data.accessToken
      setIdToken(token)
      const decodedToken = jwtDecode(token) as IUser
      await AsyncStorage.setItem('idToken', token)
      setUser({
        side: decodedToken.side as string,
        iat: decodedToken.iat as number,
        exp: decodedToken.exp as number,
        name: decodedToken.name as string,
        sub: decodedToken.sub as string
      })
      console.log('Login successfully')
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' as never }]
      })
      return true
    } catch (error) {
      if (error instanceof AxiosError && error.response && error.response.data) {
        console.log(error.response.data.message)
      }
      return false
    }
  }

  initialContext.logout = async () => {
    try {
      await AsyncStorage.removeItem('idToken')
      await POST('auth/customer/logout', {}, {}, {})
    } catch (error) {
      console.log(error)
    }
    setIdToken(null)
    setUser(undefined)
    console.log('Logout successfully')
  }

  initialContext.user = user
  initialContext.idToken = idToken

  return <AuthContext.Provider value={initialContext}>{children}</AuthContext.Provider>
}

export default AuthProvider
