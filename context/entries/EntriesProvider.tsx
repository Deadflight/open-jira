import { FC, useEffect, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import entriesApi from '../../api/entriesAPI';
import { useSnackbar } from 'notistack';

export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
}

export const EntriesProvider: FC = ({children}) => {

  const [state, dispatch] = useReducer( entriesReducer, ENTRIES_INITIAL_STATE )
  const { enqueueSnackbar } = useSnackbar();

  const addEntry = async (description: string) => {
    
    try {
      const { data } = await entriesApi.post<Entry>('/entries', { description })
      dispatch({
        type: '[Entry] Add-Entry',
        payload: data
      })
      enqueueSnackbar(
      'Entry added successfully',
      {
        variant: 'success',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        }
      }
    )
    } catch (error) {
      console.log({error})
    }

  }

  const updateEntry = async ({ _id, description, status }: Entry, showSnackbar = false) => {
    try {
      // We can send the entry in the body but is more efficient to send only description and status
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status })
      dispatch({
        type: '[Entry] Update-Entry',
        payload: data
      })
      if(showSnackbar){
        enqueueSnackbar(
          'Entry updated',
          {
            variant: 'success',
            autoHideDuration: 1500,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            }
          }
        )
      }
    } catch (error) {
      console.log({error})
    }
  }

  const deleteEntry = async (entry: Entry) => {
    try {
      await entriesApi.delete(`/entries/${entry._id}`)
      dispatch({
        type: '[Entry] Delete-Entry',
        payload: entry
      })
      enqueueSnackbar(
        'Entry deleted',
        {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          }
        }
      )
    } catch (error) {
      console.log({error})
    }
  }

  const refreshEntries = async () => {

    try{
      const {data} = await entriesApi.get<Entry[]>('/entries')
      dispatch({
        type: '[Entry] Refresh-Data',
        payload: data
      })
    }
    catch (error) {
      console.log({error})
    }
  }

  useEffect(() => {
    refreshEntries()
  }, [])

  return (
    <EntriesContext.Provider value={{
      ...state,

      //Methods
      addEntry,
      updateEntry,
      refreshEntries,
      deleteEntry
    }}>
      {children}
    </EntriesContext.Provider>
  )
}