import { Button, Input } from 'native-base'
import React from 'react'
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as yup from 'yup'
import { Controller, set, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useUser from '@/src/hooks/api/useUserApi'
import { useNavigation } from '@react-navigation/native'
import { IRegisterFormProps } from '@/src/interfaces/auth.interface'

const RegisterScreen = ({ navigation }: any) => {
  const { register } = useUser()
  const [showPassword, setShowPassword] = React.useState(false)

  const phoneRegExp = /^(\+?[1-9]\d{0,3}[ \-]*)?(?:\([0-9]{2,}\)[ \-]*)?([0-9][ \-]*){10}$/

  const schema = yup.object().shape({
    name: yup.string().trim().required('Name is required'),
    phone: yup.string().required('Phone number is required').matches(phoneRegExp, 'Phone number is invalid'),
    email: yup
      .string()
      .trim()
      .email('Invalid email')
      .required('Email is required')
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Email is invalid'),
    password: yup
      .string()
      .trim()
      .required('Password is required')
      .min(8, 'Password must contain at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/g,
        'Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character'
      )
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
    defaultValues: {
      email: '',
      password: '',
      name: '',
      phone: ''
    }
  })

  const onSubmit = async (data: IRegisterFormProps) => {
    const response = await register(data)
    console.log(response)
    if (response) {
      setError('root', {
        type: 'manual',
        message: response.split('')[0].toUpperCase() + response.slice(1)
      })
    } else {
      navigation.navigate('Login')
      clearErrors()
      resetField('email')
      resetField('password')
      resetField('name')
      resetField('phone')
    }
  }

  return (
    <ScrollView style={style.view} showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets>
      <View style={style.headerWrapper}>
        <Text style={style.header}>Sign Up</Text>
        <Text style={style.description}>Enter your details below & free sign up</Text>
      </View>

      <View style={style.formWrapper}>
        <Text style={style.headerInput}>Your name</Text>
        <Controller
          control={control}
          rules={{
            required: { value: true, message: 'Name is required' }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              size={'xl'}
              w={'100%'}
              h={60}
              borderRadius={10}
              placeholder='Name'
              type='text'
              keyboardType='default'
              _focus={{
                backgroundColor: 'white',
                borderColor: errors.name ? '#ff0000' : '#3D5CFF'
              }}
              borderColor={errors.name ? '#ff0000' : '#3D5CFF'}
              color={errors.name ? '#ff0000' : '#000000'}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              onPressIn={() => {
                clearErrors('root')
              }}
            />
          )}
          name='name'
        />
        <View style={{ marginBottom: errors.name ? 10 : 0, marginTop: 5, alignSelf: 'flex-start' }}>
          <Text style={style.error}>{errors.name?.message}</Text>
        </View>

        <Text style={style.headerInput}>Phone number</Text>
        <Controller
          control={control}
          rules={{
            required: { value: true, message: 'Phone number is required' }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              size={'xl'}
              w={'100%'}
              h={60}
              borderRadius={10}
              placeholder='Phone'
              type='text'
              keyboardType='phone-pad'
              _focus={{
                backgroundColor: 'white',
                borderColor: errors.phone ? '#ff0000' : '#3D5CFF'
              }}
              borderColor={errors.phone ? '#ff0000' : '#3D5CFF'}
              color={errors.phone ? '#ff0000' : '#000000'}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              onPressIn={() => {
                clearErrors('root')
              }}
            />
          )}
          name='phone'
        />
        <View style={{ marginBottom: errors.phone ? 10 : 0, marginTop: 5, alignSelf: 'flex-start' }}>
          <Text style={style.error}>{errors.phone?.message}</Text>
        </View>

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
                borderColor: errors.email ? '#ff0000' : '#3D5CFF'
              }}
              borderColor={errors.email ? '#ff0000' : '#3D5CFF'}
              color={errors.email ? '#ff0000' : '#000000'}
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
                borderColor: errors.password ? '#ff0000' : '#3D5CFF'
              }}
              borderColor={errors.password ? '#ff0000' : '#3D5CFF'}
              color={errors.password ? '#ff0000' : 'black'}
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
        <View style={{ marginBottom: errors.password ? 15 : 10, marginTop: 5, alignSelf: 'flex-start' }}>
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
          Sign Up
        </Button>
        <Text style={{ paddingBottom: 50 }}>
          Already have an account?{' '}
          <Text
            style={{ color: '#3D5CFF' }}
            onPress={() => {
              navigation.navigate('Login')
              clearErrors()
              resetField('email')
              resetField('password')
              resetField('name')
              resetField('phone')
            }}
          >
            Log in
          </Text>
        </Text>
      </View>
    </ScrollView>
  )
}

const style = StyleSheet.create({
  view: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'white'
  },
  headerWrapper: {
    width: '100%',
    height: 100,
    paddingHorizontal: 30,
    justifyContent: 'flex-end',
    paddingBottom: 15
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 5
  },
  description: {
    fontSize: 20
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

export default RegisterScreen
