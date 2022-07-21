import type { NextPage } from 'next'
import Link from 'next/link'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import { useForm } from 'react-hook-form'
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'
import { auth } from '../../app/firebaseApp'

type FormData = {
  email: string
  password: string
}

const Register: NextPage = () => {
  const [user] = useAuthState(auth)

  const [signInWithEmailAndPassword, , , error] =
    useSignInWithEmailAndPassword(auth)

  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = handleSubmit((data) => {
    signInWithEmailAndPassword(data.email, data.password)
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
      <h1>Вход</h1>
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
        Войти
      </Button>
      {error && (
        <Alert sx={{ mt: 2 }} severity="error">
          {error?.code === 'auth/user-not-found' && 'Аккаунт не найден'}
          {error?.code === 'auth/wrong-password' && 'Неправильный пароль'}
        </Alert>
      )}
      <Alert sx={{ mt: 2 }} severity="info">
        Еще нет аккаунта? <Link href="/auth/register">Зарегистрируйтесь</Link>.
      </Alert>
    </form>
  )
}

export default Register
