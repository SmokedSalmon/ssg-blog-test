import Nav from '@/components/Nav'
import Image from 'next/image'
import homeStyle from './home.module.css'
import localSampleImage from '@/assets/ShibaInWearingGlass.jpg'

function Home() {
  return (
      <>
        <Nav />
        <h1 className={homeStyle.normal}>This is the / page</h1>
        <Image
          src={localSampleImage}
          alt=""
        />
        <Image
          src="https://openai-labs-public-images-prod.azureedge.net/user-7vwqopdr3gB4BqG9PgWM2uWs/generations/generation-GZkwFngNELilCVshSh4u69ZD/image.webp"
          alt=""
          width={500}
          height={500}
        />
      </>
  )
}

export default Home
