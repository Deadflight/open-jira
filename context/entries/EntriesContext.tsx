import { createContext } from 'react';
import { Entry } from '../../interfaces';

interface ContextProps {
  entries: Entry[];

  //Methods
  addEntry: (description: string) => void; // Add new entry see how we declare the type of the method
  updateEntry: (entry: Entry) => void;
}

export const EntriesContext = createContext({} as ContextProps)