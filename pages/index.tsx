import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import type { NextPage } from 'next'
import { Layout } from '../components/layouts'
import { EntryList, NewEntry } from '../components/ui'

const Home: NextPage = () => {
  return (
    <Layout title='Home - Open Jira'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Pending' />
            <NewEntry />
            <EntryList status='pending' />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='In progress' />
            <EntryList status='in-progress' />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card  sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Finished' />
            <EntryList status='finished' />
          </Card>
        </Grid>
        
      </Grid>
    </Layout>
  )
}

export default Home
