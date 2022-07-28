import { FC } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Link from 'next/link'

import type PostType from '../types/post'

type PostPropTypes = {
  post: PostType
}

const Post: FC<PostPropTypes> = ({ post }) => {
  return (
    <Card>
      <CardHeader
        title={post.user.name}
        subheader={post.createdAt ? post.createdAt?.toLocaleDateString() : ''}
      />
      <Link href={`/posts/${post.id}`}>
        <a>
          <CardMedia component="img" image={post.imageURL} />
        </a>
      </Link>
      <CardContent>{post.text}</CardContent>
      <CardActions>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default Post
