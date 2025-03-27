import { auth } from '@/auth'

const Home = async () => {
  const session = await auth()
  console.log('session', session)
  return <>Home</>
}

export default Home
