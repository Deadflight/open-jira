import { FC, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import { v4 as uuidv4 } from 'uuid';

export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: 'Learn React',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description: 'Code React',
      status: 'in-progress',
      createdAt: Date.now() - 10000,
    },    
    {
      _id: uuidv4(),
      description: 'Deploy React',
      status: 'finished',
      createdAt: Date.now() - 100000,
    }
  ],
}

export const EntriesProvider: FC = ({children}) => {

  const [state, dispatch] = useReducer( entriesReducer, ENTRIES_INITIAL_STATE )

  const addEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: 'pending'
    }

    dispatch({
      type: '[Entry] Add-Entry',
      payload: newEntry
    })
  }

  const updateEntry = (entry: Entry) => {
    dispatch({
      type: '[Entry] Entry-Updated',
      payload: entry
    })
  }

  return (
    <EntriesContext.Provider value={{
      ...state,

      //Methods
      addEntry,
      updateEntry
    }}>
      {children}
    </EntriesContext.Provider>
  )
}