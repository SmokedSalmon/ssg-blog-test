import Nav from '@/components/Nav'
import homeStyle from './about.module.css'

function About() {
  return (
      <>
        <Nav />
        <h1 className={homeStyle.normal}>Something about me</h1>
      </>
  )
}

export default About
