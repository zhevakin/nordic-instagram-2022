import { ChangeEvent } from 'react'
import { collection, addDoc, serverTimestamp, doc } from 'firebase/firestore'
import { ref, getDownloadURL } from 'firebase/storage'
import { useForm } from 'react-hook-form'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useUploadFile } from 'react-firebase-hooks/storage'
import { useRouter } from 'next/router'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { auth, db, storage } from '../../app/firebaseApp'
import { Alert } from '@mui/material'
import { useDocumentData } from 'react-firebase-hooks/firestore'

type FormData = {
  imageURL: string
  text: string
}

const New = () => {
  const [user] = useAuthState(auth)
  const docRef = doc(db, 'users', String(user?.uid))
  const [userProfile] = useDocumentData(docRef)

  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onChange' })
  const [uploadFile, uploading] = useUploadFile()
  const imageURLValue = watch('imageURL')

  const onSubmit = handleSubmit(async (data) => {
    if (user && userProfile) {
      const newPost = {
        text: data.text,
        uid: user.uid,
        user: {
          name: userProfile.name,
        },
        createdAt: serverTimestamp(),
        imageURL: data.imageURL,
      }
      const docRef = await addDoc(collection(db, 'posts'), newPost)
      router.push(`/posts/${docRef.id}`)
    }
  })

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileRef = ref(
        storage,
        `${Date.now()}-${event.target.files[0].name}`
      )
      const result = await uploadFile(fileRef, event.target.files[0])
      if (result) {
        const imageURL = await getDownloadURL(result?.ref)
        setValue('imageURL', imageURL, { shouldValidate: true })
      }
    }
  }

  register('imageURL', { required: true })

  return (
    <div>
      <h1>Новый пост</h1>
      <form onSubmit={onSubmit}>
        <div>
          <Button
            disabled={uploading}
            component="label"
            variant="contained"
            sx={{ mb: 1 }}
          >
            Загрузить фото
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </div>
        {errors.imageURL && (
          <Alert severity="error">Пожалуйста, загрузите фото</Alert>
        )}
        {imageURLValue && (
          <img src={imageURLValue} alt="" style={{ width: 200 }} />
        )}
        <TextField
          {...register('text')}
          multiline
          label="Текст поста"
          rows={4}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit">Опубликовать</Button>
      </form>
    </div>
  )
}

export default New
