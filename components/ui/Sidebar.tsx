import { InboxOutlined } from "@mui/icons-material"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from "@mui/material"
import { FC, useContext } from "react"
import { UIContext } from '../../context/ui';

const menuItems = [
  'Inbox',
  'Starred',
  'Send email',
  'Drafts'
]

const Sidebar: FC = () => {

  const { sidemenuOpen, closeSideMenu } = useContext(UIContext)

  return (
    <Drawer
      anchor="left"
      open={sidemenuOpen}
      onClose={closeSideMenu}
    >
      <Box  sx={{width: 250}}>
        <Box sx={{ padding: '5px 10px' }}>
          <Typography variant="h4">Menu</Typography>
        </Box>
        
        <List>
          {
            menuItems.map((item, index) => (
              <ListItem button key={item}>
                <ListItemIcon>
                  {
                    index % 2 === 0 ? <InboxOutlined /> : <MailOutlineIcon />
                  }
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))
          }
        </List>
        <Divider />
                <List>
          {
            menuItems.map((item, index) => (
              <ListItem button key={item}>
                <ListItemIcon>
                  {
                    index % 2 === 0 ? <InboxOutlined /> : <MailOutlineIcon />
                  }
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))
          }
        </List>
      </Box>
    </Drawer>
  )
}

export default Sidebar