import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material"
import { FC, useContext } from "react"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from '../../context/ui';
import NextLink from "next/link";

const Navbar: FC = () => {
  const { openSideMenu } = useContext(UIContext)

  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* <IconButton
          size="large"
          edge="start"
          onClick={openSideMenu}
        >
          <MenuOutlinedIcon />
        </IconButton> */}
        <NextLink href='/' passHref>
          <Link underline="none" color='white'>
            <Typography variant="h6">Open Jira</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar