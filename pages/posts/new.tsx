import { ChangeEvent } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref, getDownloadURL } from 'firebase/storage'
import { useForm } from 'react-hook-form'
import { useUploadFile } from 'react-firebase-hooks/storage'
import { useRouter } from 'next/router'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { db, storage } from '../../app/firebaseApp'
import { Alert } from '@mui/material'
import useUserProfile from '../../helpers/useUserProfile'
import ImagesOrder from '../../components/ImagesOrder'

type FormData = {
  images: string[]
  text: string
}

const New = () => {
  const { userProfile } = useUserProfile()

  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onChange' })
  const [uploadFile, uploading] = useUploadFile()
  const imagesValue = watch('images')

  const onSubmit = handleSubmit(async (data) => {
    if (userProfile) {
      const newPost = {
        text: data.text,
        uid: userProfile.uid,
        user: {
          name: userProfile.name,
        },
        createdAt: serverTimestamp(),
        images: data.images,
      }
      const docRef = await addDoc(collection(db, 'posts'), newPost)
      router.push(`/posts/${docRef.id}`)
    }
  })

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileUploads = Array.from(event.target.files).map(async (file) => {
        const fileRef = ref(storage, `${Date.now()}-${file.name}`)
        const result = await uploadFile(fileRef, file)
        if (result) {
          return await getDownloadURL(result?.ref)
        }
        return ''
      })

      const results = await Promise.all(fileUploads)

      if (results) {
        setValue('images', results, { shouldValidate: true })
      }
    }
  }

  const handleImagesSort = (newImages: string[]) => {
    setValue('images', newImages)
  }

  register('images', { required: true })

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
            <input multiple type="file" hidden onChange={handleFileChange} />
          </Button>
        </div>
        {errors.images && (
          <Alert severity="error">
            Пожалуйста, загрузите хотя бы одно фото
          </Alert>
        )}
        {imagesValue && (
          <ImagesOrder images={imagesValue} onSort={handleImagesSort} />
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
