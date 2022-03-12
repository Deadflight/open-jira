import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { Layout } from '../components/layouts'

const Home: NextPage = () => {
  return (
    <Layout title='Open Jira'>
      <Typography variant='h1'>Hola</Typography>
    </Layout>
  )
}

export default Home
