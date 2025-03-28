import {
  SignInSchemaType,
  SignUpSchemaType,
} from '@/modules/auth/helpers/validation'

export const signInDefaultValues: SignInSchemaType = {
  email: '',
  password: '',
}

export const signUpDefaultValues: SignUpSchemaType = {
  name: '',
  username: '',
  email: '',
  password: '',
}

export const signSchemaMap = {
  name: 'Имя',
  username: 'Имя пользователя',
  email: 'Электронная почта',
  password: 'Пароль',
} as const
