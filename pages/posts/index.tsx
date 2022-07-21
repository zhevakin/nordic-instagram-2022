import type { NextPage } from 'next'
import Link from 'next/link'
import { collection } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../../app/firebaseApp'

const Posts: NextPage = () => {
  const [posts] = useCollection(collection(db, 'posts'))
  console.log(posts)
  return (
    <div>
      <h1>Список постов</h1>
      {posts && (
        <div>
          {posts.docs.map((post) => (
            <div key={post.id}>
              <Link href={`/posts/${post.id}`}>{post.id}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Posts
