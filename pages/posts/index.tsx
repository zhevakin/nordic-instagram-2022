import type { NextPage } from 'next'
import Link from 'next/link'
import { collection, query, orderBy } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Box from '@mui/material/Box'
import Post from '../../components/Post'
import { db } from '../../app/firebaseApp'
import postConverter from '../../helpers/postConverter'

const Posts: NextPage = () => {
  const postsRef = collection(db, 'posts').withConverter(postConverter)
  const [posts] = useCollectionData(
    query(postsRef, orderBy('createdAt', 'desc'))
  )

  return (
    <div>
      <h1>Список постов</h1>
      {posts &&
        posts.map((post) => (
          <Box key={post.id} sx={{ mb: 2, maxWidth: '500px' }}>
            <Post post={post} />
          </Box>
        ))}
    </div>
  )
}

export default Posts
