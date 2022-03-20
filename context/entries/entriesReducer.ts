import { Entry } from '../../interfaces';
import { EntriesState } from './';


// Con esto es como en typescript creamos algo como los actions creators
type EntriesActionType =
  | {type: '[Entry] Add-Entry', payload: Entry}
  | {type: '[Entry] Entry-Updated', payload: Entry}
  | {type: '[Entry] Refresh-Data', payload: Entry[]}

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
  switch(action.type) {
    case '[Entry] Add-Entry':
      return {
        ...state,
        entries: [...state.entries, action.payload]
      }

    case '[Entry] Entry-Updated':
      return {
        ...state,
        entries: state.entries.map(entry => {
          if (entry._id === action.payload._id) {
            //return action.payload
            
            // Para mas control podemos hacer asi
            entry.status = action.payload.status
            entry.description = action.payload.description
          }
          return entry
        })
      }

    case '[Entry] Refresh-Data':
      return {
        ...state,
        entries: [...action.payload]
      }
    default :
      return state
  }
}