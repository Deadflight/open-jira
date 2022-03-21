import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from "@mui/material"
import { Layout } from "../../components/layouts"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Entry, EntryStatus } from "../../interfaces";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { ChangeEvent, FC, useContext, useMemo, useState } from "react";
import { GetServerSideProps } from 'next'
import { dbEntries } from "../../database";
import { EntriesContext } from '../../context/entries/EntriesContext';
import { useRouter } from 'next/router';
import { dateFunctions } from "../../utils";


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
  entry: Entry
}

const EntryPage: FC<Props> = ({entry}) => {

  const {updateEntry, deleteEntry, refreshEntries} = useContext(EntriesContext)
  const router = useRouter()
  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState(entry.status)
  const [touched, setTouched] = useState(false)
  const timeCreated = useMemo(() => dateFunctions.getFormatDistanceToNow(entry.createdAt), [entry.createdAt])

  //useMemo is a hook that allows us to avoid recalculating the value
  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

  const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus)
  }

  const onSave = async () => {
    if(inputValue.trim().length === 0) return
    setInputValue('')
    setTouched(false)
    const updatedEntry: Entry = {
      ...entry,
      description: inputValue,
      status
    }
    await updateEntry(updatedEntry, true)
    await refreshEntries()
    router.push('/')
  }

  const onDelete = async () => {
    await deleteEntry(entry)
    await refreshEntries()
    router.push('/')
  }

  return (
    <Layout title={entry.description.substring(0,20) + '...'}>
      <Grid container justifyContent='center' sx={{marginTop: 2}}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader title={`Entry: ${inputValue}`} subheader={`Created ${timeCreated} ago`}/>
            <CardContent>
              <TextField 
                sx={{marginTop: 2 , marginBottom: 1}} 
                fullWidth
                autoFocus
                multiline
                placeholder="New Entry"
                value={inputValue}
                onChange={onInputValueChange}
                helperText={isNotValid && 'Enter a new entry'}
                onBlur={() => setTouched(true)}
                error={isNotValid}
              />
              <FormControl>
                <FormLabel>Status</FormLabel>
                <RadioGroup 
                  row
                  value={status}
                  onChange={onStatusChange}
                >
                  {
                    validStatus.map(status => (
                      <FormControlLabel key={status} value={status} control={<Radio />} label={capitalize(status)} />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'red',
        }}
        onClick={onDelete}
      >
        <DeleteOutlinedIcon />
      </IconButton>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const { id } = params as { id: string }
  
  const entry = await dbEntries.getEntryById(id)

  if(!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      entry
    }
  }
}

export default EntryPage