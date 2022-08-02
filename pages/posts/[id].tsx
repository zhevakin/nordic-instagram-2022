import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { collection, doc } from 'firebase/firestore'
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore'
import Post from '../../components/Post'
import { db } from '../../app/firebaseApp'
import postConverter from '../../helpers/postConverter'
import Comments from '../../components/Comments'
import commentConverter from '../../helpers/commentsConverter'

const PostPage: NextPage = () => {
  const router = useRouter()
  const docRef = doc(db, 'posts', String(router.query.id)).withConverter(
    postConverter
  )
  const [post] = useDocumentData(docRef)
  const commentsRef = collection(
    db,
    'posts',
    String(post?.id),
    'comments'
  ).withConverter(commentConverter)
  const [comments] = useCollectionData(commentsRef)

  return (
    <div>
      <h1>Страница поста</h1>
      {post && <Post post={post} />}
      {comments && <Comments comments={comments} />}
    </div>
  )
}

export default PostPage
