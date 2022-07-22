import type { NextPage } from 'next'
import { collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '../../app/firebaseApp'
import Link from 'next/link'
import postConverter from '../../helpers/postConverter'

const Posts: NextPage = () => {
  const [posts] = useCollectionData(
    collection(db, 'posts').withConverter(postConverter)
  )
  return (
    <div>
      <h1>Список постов</h1>
      {posts && (
        <div>
          {posts.map((post) => (
            <div key={post.id}>
              <Link href={`/posts/${post.id}`}>{post.text}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Posts
