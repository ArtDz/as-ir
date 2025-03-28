import { auth } from '@/auth'
import { Container } from '@/components/template/Container'

const Home = async () => {
  const session = await auth()
  console.log('session', session)
  return <Container>Home</Container>
}

export default Home
