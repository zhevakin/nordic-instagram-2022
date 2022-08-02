import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

type CommentFormProps = {
  onSubmit: (data: FormData) => void
}

type FormData = {
  text: string
}

const CommentForm: FC<CommentFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()
  const onFormSubmit = handleSubmit((data) => {
    onSubmit(data)
    reset()
  })
  return (
    <form onSubmit={onFormSubmit}>
      <TextField
        {...register('text', { required: true })}
        multiline
        fullWidth
        rows={3}
        placeholder="Введите ваш комментарий"
      />
      {errors.text && (
        <Alert severity="error">Пожалуйста, введите комментарий</Alert>
      )}
      <Button type="submit">Отправить</Button>
    </form>
  )
}

export default CommentForm
