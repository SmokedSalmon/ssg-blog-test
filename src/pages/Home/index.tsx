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
          alt="shiba wearing optical"
        />
        <p>(Build time script-loaded image)</p>
        <br />
        <Image
          src="https://openai-labs-public-images-prod.azureedge.net/user-7vwqopdr3gB4BqG9PgWM2uWs/generations/generation-GZkwFngNELilCVshSh4u69ZD/image.webp"
          alt="shiba at work"
          width={500}
          height={500}
        />
        <p>(Remote Image)</p>
        <br />
        <Image
          src="/public/shiba.jpg"
          alt="shiba"
          width={500}
          height={500}
        />
        <p>(Runtime local asset image)</p>
      </>
  )
}

export default Home
