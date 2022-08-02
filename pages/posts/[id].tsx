import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  increment,
} from 'firebase/firestore'
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore'
import Box from '@mui/material/Box'
import PostContainer from '../../containers/PostContainer'
import { auth, db } from '../../app/firebaseApp'
import postConverter from '../../helpers/postConverter'
import Comments from '../../components/Comments'
import commentConverter from '../../helpers/commentsConverter'
import CommentForm from '../../components/CommentForm'
import { useAuthState } from 'react-firebase-hooks/auth'

const PostPage: NextPage = () => {
  const [user] = useAuthState(auth)
  const [userProfile] = useDocumentData(doc(db, 'users', String(user?.uid)))
  const router = useRouter()
  const docRef = doc(db, 'posts', String(router.query.id))
  const [post] = useDocumentData(docRef.withConverter(postConverter))
  const commentsRef = collection(db, 'posts', String(post?.id), 'comments')
  const [comments] = useCollectionData(
    query(
      commentsRef.withConverter(commentConverter),
      orderBy('createdAt', 'asc')
    )
  )

  const handleCommentSubmit = (data: { text: string }) => {
    if (!user) {
      return
    }

    const newComment = {
      uid: user.uid,
      user: {
        name: userProfile?.name,
      },
      text: data.text,
      createdAt: serverTimestamp(),
    }
    addDoc(commentsRef, newComment)

    // Увеличим счетчик комментариев
    updateDoc(docRef, { commentsCount: increment(1) })
  }

  return (
    <div>
      <h1>Страница поста</h1>
      {post && <PostContainer post={post} />}
      <Box sx={{ my: 3 }}>
        <h3>Комментарии</h3>
        {comments && <Comments comments={comments} />}
        <CommentForm onSubmit={handleCommentSubmit} />
      </Box>
    </div>
  )
}

export default PostPage
