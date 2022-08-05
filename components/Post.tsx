import { FC } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CommentIcon from '@mui/icons-material/Comment'
import Link from 'next/link'
import { formatDistance } from 'date-fns'
import { ru } from 'date-fns/locale'

import type PostType from '../types/post'
import Images from './Images'

type PostPropTypes = {
  post: PostType
  onLikeClick?: () => void
  liked?: boolean
}

const Post: FC<PostPropTypes> = ({ post, onLikeClick, liked }) => {
  const date = post.createdAt
    ? formatDistance(post.createdAt, new Date(), {
        addSuffix: true,
        locale: ru,
      })
    : ''
  return (
    <Card>
      <CardHeader title={post.user.name} subheader={date} />
      {post.images && <Images images={post.images} />}
      <CardContent>{post.text}</CardContent>
      <CardActions>
        <IconButton onClick={onLikeClick}>
          <FavoriteIcon sx={{ color: liked ? 'red' : 'gray' }} />{' '}
        </IconButton>
        {post.likesCount > 0 ? post.likesCount : ''}
        <CommentIcon sx={{ ml: 3, mr: 1, color: 'gray' }} />
        {post.commentsCount > 0 ? post.commentsCount : ''}
      </CardActions>
    </Card>
  )
}

export default Post
