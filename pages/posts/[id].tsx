import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { doc } from 'firebase/firestore'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import Post from '../../components/Post'
import { db } from '../../app/firebaseApp'
import postConverter from '../../helpers/postConverter'

const PostPage: NextPage = () => {
  const router = useRouter()
  const docRef = doc(db, 'posts', String(router.query.id)).withConverter(
    postConverter
  )
  const [post] = useDocumentData(docRef)

  return (
    <div>
      <h1>Страница поста</h1>
      {post && <Post post={post} />}
    </div>
  )
}

export default PostPage
