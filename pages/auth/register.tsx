import type { NextPage } from 'next'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import { useForm } from 'react-hook-form'
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'
import { auth } from '../../app/firebaseApp'

type FormData = {
  name: string
  email: string
  password: string
}

const Register: NextPage = () => {
  const [user] = useAuthState(auth)

  const [createUserWithEmailAndPassword, , , error] =
    useCreateUserWithEmailAndPassword(auth)

  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = handleSubmit((data) => {
    createUserWithEmailAndPassword(data.email, data.password)
  })

  if (user) {
    return (
      <div>
        <div>Вы вошли как {user.email}</div>
        <Button onClick={() => signOut(auth)}>Выйти</Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Регистрация</h1>
      <TextField
        {...register('name')}
        type="text"
        label="Ваше имя"
        sx={{ mb: 2 }}
        fullWidth
      />
      <TextField
        {...register('email')}
        type="email"
        label="Ваш email"
        sx={{ mb: 2 }}
        fullWidth
      />
      <TextField
        {...register('password')}
        type="password"
        label="Пароль"
        sx={{ mb: 2 }}
        fullWidth
      />
      <Button type="submit" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
      {error?.code === 'auth/email-already-in-use' && (
        <Alert sx={{ mt: 2 }} severity="error">
          Email занят
        </Alert>
      )}
    </form>
  )
}

export default Register
