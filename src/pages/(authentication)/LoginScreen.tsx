import { Button, Input } from 'native-base'
import React from 'react'
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ILoginFormProps } from '../../interfaces/auth.interface'
import { AuthContext } from '../../contexts/AuthContext'
import useAuth from '../../hooks/useAuth'

const LoginScreen = ({ navigation }: any) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const { login } = useAuth()

  const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Invalid email'),
    password: yup.string().required('Password is required').min(8, 'Password must contain at least 8 characters')
  })
  const {
    control,
    handleSubmit,
    clearErrors,
    resetField,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: ILoginFormProps) => {
    const result = await login(data)
    if (result === false) {
      setError('root', {
        type: 'manual',
        message: 'Incorrect email or password'
      })
    }
  }

  return (
    <SafeAreaView style={style.view}>
      <View style={style.headerWrapper}>
        <Text style={style.header}>Log In</Text>
      </View>

      <View style={style.formWrapper}>
        <Text style={style.headerInput}>Your Email</Text>
        <Controller
          control={control}
          rules={{
            required: { value: true, message: 'Email is required' }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              size={'xl'}
              w={'100%'}
              h={60}
              borderRadius={10}
              placeholder='Email'
              type='text'
              keyboardType='email-address'
              _focus={{
                backgroundColor: 'white',
                borderColor: errors.email || errors.root ? '#ff0000' : '#3D5CFF'
              }}
              borderColor={errors.email || errors.root ? '#ff0000' : '#3D5CFF'}
              color={errors.email || errors.root ? '#ff0000' : '#000000'}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              onPressIn={() => {
                clearErrors('root')
              }}
            />
          )}
          name='email'
        />
        <View style={{ marginBottom: errors.email ? 10 : 0, marginTop: 5, alignSelf: 'flex-start' }}>
          <Text style={style.error}>{errors.email?.message}</Text>
        </View>

        <Text style={style.headerInput}>Password</Text>
        <Controller
          control={control}
          rules={{
            minLength: { value: 8, message: 'Password must have at least 8 characters' }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              size={'xl'}
              w={'100%'}
              h={60}
              borderRadius={10}
              placeholder='Password'
              type={showPassword ? 'text' : 'password'}
              _ios={{
                keyboardType: 'ascii-capable'
              }}
              _android={{
                keyboardType: 'default'
              }}
              _focus={{
                backgroundColor: 'white',
                borderColor: errors.password || errors.root ? '#ff0000' : '#3D5CFF'
              }}
              borderColor={errors.password || errors.root ? '#ff0000' : '#3D5CFF'}
              color={errors.password || errors.root ? '#ff0000' : 'black'}
              InputRightElement={
                <Pressable onPress={() => setShowPassword(!showPassword)} style={{ marginRight: 10 }}>
                  {showPassword ? (
                    <Ionicons name='eye-outline' size={24} color='black' />
                  ) : (
                    <Ionicons name='eye-off-outline' size={24} color='black' />
                  )}
                </Pressable>
              }
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              onPressIn={() => {
                clearErrors('root')
              }}
            />
          )}
          name='password'
        />
        <View style={{ marginBottom: errors.password || errors.root ? 15 : 10, marginTop: 5, alignSelf: 'flex-start' }}>
          <Text style={style.error}>{errors.password?.message || errors.root?.message}</Text>
        </View>

        <Button
          style={style.loginButton}
          variant={'solid'}
          _text={{
            fontWeight: '600',
            fontSize: 20
          }}
          _pressed={{ opacity: 0.8 }}
          onPress={handleSubmit(onSubmit)}
        >
          Log In
        </Button>
        <Text>
          Don't have an account?{' '}
          <Text
            style={{ color: '#3D5CFF' }}
            onPress={() => {
              navigation.navigate('Register')
              clearErrors()
              resetField('email')
              resetField('password')
            }}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  headerWrapper: {
    width: '100%',
    height: 80,
    paddingHorizontal: 30,
    justifyContent: 'flex-end',
    paddingBottom: 15
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  formWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24
  },
  headerInput: {
    fontSize: 20,
    marginBottom: 10,
    color: '#858597',
    alignSelf: 'flex-start'
  },
  loginButton: {
    minWidth: '100%',
    height: 60,
    backgroundColor: '#3D5CFF',
    borderRadius: 10,
    marginBottom: 20
  },
  error: {
    color: 'red'
  }
})

export default LoginScreen
