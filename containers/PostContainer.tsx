import { doc, increment, updateDoc } from 'firebase/firestore'
import { FC } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { auth, db } from '../app/firebaseApp'
import Post from '../components/Post'
import userConverter from '../helpers/userConverter'

import type PostType from '../types/post'

type PostContainerProps = {
  post: PostType
}

const PostContainer: FC<PostContainerProps> = ({ post }) => {
  const [user] = useAuthState(auth)
  const [userProfile] = useDocumentData(
    doc(db, 'users', String(user?.uid)).withConverter(userConverter)
  )
  const userLikes = userProfile?.likes || []

  const handleLikeClick = () => {
    if (!user) {
      return
    }

    const isLiked = userLikes.includes(post.id)
    if (isLiked) {
      const newLikes = userLikes.filter((like) => like !== post.id)
      updateDoc(doc(db, 'users', String(user.uid)), { likes: newLikes })
      updateDoc(doc(db, 'posts', post.id), { likesCount: increment(-1) })
    } else {
      const newLikes = [...userLikes, post.id]
      updateDoc(doc(db, 'users', String(user.uid)), { likes: newLikes })
      updateDoc(doc(db, 'posts', post.id), { likesCount: increment(1) })
    }
  }

  return (
    <Post
      post={post}
      onLikeClick={handleLikeClick}
      liked={userLikes.includes(post.id)}
    />
  )
}

export default PostContainer
