import { Container } from '@/components/template/Container'
import { PostForm } from '@/modules/posts/components'

const CreatePost = () => {
  return (
    <Container>
      <h1 className='h1-bold text-dark100_light900'>Создать пост</h1>

      <div className='mt-9'>
        <PostForm />
      </div>
    </Container>
  )
}

export default CreatePost
