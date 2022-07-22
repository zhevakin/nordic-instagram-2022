import { DocumentData, DocumentReference } from 'firebase/firestore'

type Post = {
  id: string
  ref: DocumentReference<DocumentData>
  text: string
}

export default Post
