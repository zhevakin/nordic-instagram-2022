import { FC } from 'react'
import type Comment from '../types/comment'

type CommentProps = {
  comments: Comment[]
}

const Comments: FC<CommentProps> = ({ comments }) => {
  if (comments.length === 0) {
    return <h3>Комментариев пока нет</h3>
  }

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <div>{comment.user.name}</div>
          <div>{comment.text}</div>
        </div>
      ))}
    </div>
  )
}

export default Comments
