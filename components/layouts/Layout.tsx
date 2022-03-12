import { Box } from "@mui/material"
import Head from "next/head"
import { FC } from "react"
import { Navbar, Sidebar } from "../ui"

interface Props {
  title?: string
}

const Layout: FC<Props> = ({ title = 'Open Jira', children}) => {
  return (
    <Box sx={{ flexgrow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <Sidebar />

      <Box sx={{ paddingTop: '10px 20px' }}>
        {children}
      </Box>
    </Box>
  )
}

export default Layout