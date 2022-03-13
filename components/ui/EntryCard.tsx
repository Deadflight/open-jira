import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { DragEvent, FC, useContext } from 'react';
import { Entry } from "../../interfaces"
import { UIContext } from '../../context/ui';
interface Props {
  entry: Entry
}

const EntryCard: FC<Props> = ({ entry }) => {

  const { startDragging, endDragging } = useContext(UIContext)

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', entry._id)

    startDragging()
  }

  const onDragEnd = (event: DragEvent<HTMLDivElement>) => {
    endDragging()
  }

  return (
    <Card 
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {entry.description}
          </Typography> 
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2}}>
          <Typography variant='body2'> hace 30 seg</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}

export default EntryCard