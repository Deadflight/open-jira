import { Add, SaveOutlined } from "@mui/icons-material"
import { Box, Button, TextField } from "@mui/material"
import { useSnackbar } from "notistack"
import { ChangeEvent, FC, useContext, useState } from "react"
import { EntriesContext } from "../../context/entries"
import { UIContext } from "../../context/ui"

const NewEntry: FC = () => {
  const [inputValue, setInputValue] = useState('')
  const [touched, setTouched] = useState(false)

  const { addEntry, refreshEntries } = useContext(EntriesContext)
  const { setIsAddingEntry, isAddingEntry } = useContext(UIContext)
  
  const { enqueueSnackbar } = useSnackbar();


  const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onCancel = () => {
    setInputValue('')
    setTouched(false)
    setIsAddingEntry(false)
  }

  const onSave = () => {
    if(inputValue.length === 0) return
    addEntry(inputValue)
    setIsAddingEntry(false)
    setInputValue('')
    setTouched(false)
    refreshEntries()
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {
        isAddingEntry ? (
          <>
            <TextField 
              fullWidth 
              sx={{ marginTop: 2, marginBottom: 1 }}
              placeholder='Nueva entrada'
              autoFocus
              multiline
              label='Nueva entrada'
              helperText={inputValue.length <= 0 && touched && 'Escribe aquí tu nueva entrada'}
              value={inputValue}
              onChange={onTextFieldChanges}
              error={inputValue.length <= 0 && touched}
              onBlur={() => setTouched(true)}
            />
            <Box display='flex' justifyContent='space-between'>
              <Button
                variant="text"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                color='secondary'
                endIcon={<SaveOutlined />}
                onClick={onSave}
              >
                Save
              </Button>
            </Box>
          </>
        )
        : (
          <Button
            startIcon={<Add />}
            fullWidth
            variant='outlined'
            onClick={() => setIsAddingEntry(true)}
          >
            Add Entry
          </Button>
        )
      }

    </Box>
  )
}

export default NewEntry