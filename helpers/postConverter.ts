import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from 'firebase/firestore'
import type Post from '../types/post'

const postConverter: FirestoreDataConverter<Post> = {
  toFirestore(post: WithFieldValue<Post>): DocumentData {
    return { text: post.text }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Post {
    const data = snapshot.data(options) as Post
    return {
      id: snapshot.id,
      text: data.text,
    }
  },
}

export default postConverter
