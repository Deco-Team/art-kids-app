import { jwtDecode } from 'jwt-decode'
import { createContext, useEffect, useState } from 'react'
import { POST } from '../utils/api.caller'
import { useNavigation } from '@react-navigation/native'
import { IUser } from '../interfaces/user.interface'
import { IAuthContextProps, ILoginFormProps } from '../interfaces/auth.interface'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AxiosError } from 'axios'
import { log } from '../utils/logger.util'

const initialContext: IAuthContextProps = {
  user: {
    side: '',
    iat: 0,
    exp: 0,
    name: '',
    sub: ''
  },
  idToken: null,
  refreshToken: null,
  login: () => Promise.resolve(false),
  logout: async () => {
    return
  }
}

export const AuthContext = createContext<IAuthContextProps>(initialContext)

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [idToken, setIdToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)
  const [user, setUser] = useState<IUser | undefined>()
  const navigation = useNavigation()

  useEffect(() => {
    ;(async () => {
      try {
        const storedToken = await Promise.all([AsyncStorage.getItem('idToken'), AsyncStorage.getItem('refreshToken')])
        log.debug('Stored token', storedToken)
        if (storedToken[0] && storedToken[1]) {
          setIdToken(storedToken[0]), setRefreshToken(storedToken[1])
          const decodedToken = jwtDecode(storedToken[0]) as IUser
          if (decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
            setUser({
              side: decodedToken.side as string,
              iat: decodedToken.iat as number,
              exp: decodedToken.exp as number,
              name: decodedToken.name as string,
              sub: decodedToken.sub as string
            })
          }
          return
        }
      } catch (error) {
        log.error(error)
      }

      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeNavigation' as never }]
      })
    })()
  }, [])

  // useEffect(() => {
  //   if (idToken) {
  //     try {
  //       const decodedToken = jwtDecode(idToken) as IUser
  //       if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
  //         navigation.reset({
  //           index: 0,
  //           routes: [{ name: 'HomeNavigation' as never }]
  //         })
  //       } else
  //         setUser({
  //           side: decodedToken.side as string,
  //           iat: decodedToken.iat as number,
  //           exp: decodedToken.exp as number,
  //           name: decodedToken.name as string,
  //           sub: decodedToken.sub as string
  //         })
  //     } catch (error) {
  //       navigation.reset({
  //         index: 0,
  //         routes: [{ name: 'HomeNavigation' as never }]
  //       })
  //     }
  //   } else {
  //     navigation.reset({
  //       index: 0,
  //       routes: [{ name: 'HomeNavigation' as never }]
  //     })
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [idToken, refreshToken])

  const login = async ({ email, password }: ILoginFormProps) => {
    try {
      const { data } = await POST('auth/customer/login', { email, password }, {}, {})
      setIdToken(data.data.accessToken)
      setRefreshToken(data.data.refreshToken)
      await AsyncStorage.setItem('idToken', data.data.accessToken)
      await AsyncStorage.setItem('refreshToken', data.data.refreshToken)
      const decodedToken = jwtDecode(data.data.accessToken) as IUser
      setUser({
        side: decodedToken.side as string,
        iat: decodedToken.iat as number,
        exp: decodedToken.exp as number,
        name: decodedToken.name as string,
        sub: decodedToken.sub as string
      })
      log.info('Login successfully')
      if (navigation.canGoBack()) {
        navigation.goBack()
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeNavigation' as never }]
        })
      }

      return true
    } catch (error) {
      if (error instanceof AxiosError && error.response && error.response.data) {
        log.error(error.response.data.message)
      }
      return false
    }
  }

  const logout = async () => {
    try {
      await POST(
        'auth/customer/logout',
        {},
        {},
        { Accept: 'application/json', Authorization: `Bearer ${refreshToken}` }
      )
      await AsyncStorage.removeItem('idToken')
      await AsyncStorage.removeItem('refreshToken')
      setIdToken(null)
      setUser(undefined)
      log.info('Logout successfully')
      if (navigation.canGoBack()) {
        navigation.goBack()
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeNavigation' as never }]
        })
      }
    } catch (error) {
      log.error(error)
    }
  }

  return <AuthContext.Provider value={{ idToken, refreshToken, user, login, logout }}>{children}</AuthContext.Provider>
}

export default AuthProvider
