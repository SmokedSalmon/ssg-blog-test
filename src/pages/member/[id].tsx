import axios from 'axios'
import type { InferGetStaticPropsType, GetStaticPaths, GetStaticProps } from 'next'
import Nav from '@/components/Nav'
import homeStyle from './member.module.css'
import externalData from '@/../dummyData/members.json'

type Member = {
  name: string,
  age: number,
  sex: 'male' | 'female',
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(externalData).map((key) => ({ params: {id : key } }))
  return Promise.resolve({
    paths,
    fallback: false,
  })
}

export const getStaticProps: GetStaticProps<{ member: Member }, { id: string }> =
  async ({ params }) => {
    const id = (params && params.id) || '1'
    const member: Member = (externalData as { [key: string]: Member })[id]
    
    return await Promise.resolve({ props: { member } })
  }

function Member({ member }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
      <>
        <Nav />
        <h1 className={homeStyle.normal}>{member.name}</h1>
        <p>age: {member.age}</p>
        <p>sex: {member.sex}</p>
      </>
  )
}

export default Member
