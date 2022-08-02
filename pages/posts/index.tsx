import type { NextPage } from 'next'
import { doc, collection, query, orderBy } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Box from '@mui/material/Box'
import PostContainer from '../../containers/PostContainer'
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
            <PostContainer post={post} />
          </Box>
        ))}
    </div>
  )
}

export default Posts
