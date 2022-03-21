import { Paper, List, ListItem } from "@mui/material"
import { FC, useContext, useMemo, DragEvent } from "react"
import { EntryCard } from "./"
import { EntryStatus } from '../../interfaces/entry';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from "../../context/ui";
import styles from "./EntryList.module.css"

interface Props {
  status: EntryStatus
}

const EntryList: FC<Props> = ({status}) => {
  
  const { entries, updateEntry } = useContext(EntriesContext)

  const { isDragging, endDragging } = useContext(UIContext)

  //filter by status
  const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries, status])

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("text")

    const entry = entries.find(entry => entry._id === id)!
    entry.status = status
    updateEntry(entry)
    endDragging()
  }

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  return (
    // TODO: Add Drag and drop functionality
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ''}
      
    >
      <Paper sx={{ height: 'calc(100vh - 210px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '3px 5px', '&::-webkit-scrollbar': { display: 'none' } }}>

        {/* TODO Gonna Change when drag or no */}
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s'  }}>
          {
            entriesByStatus.map(entry => (
              <EntryCard key={entry._id} entry={entry} />
            ))
          }
        </List>
      </Paper>
    </div>
  )
}

export default EntryList
