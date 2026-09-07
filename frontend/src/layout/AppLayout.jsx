import { Outlet } from "react-router"
import Navbar from "../components/Navbar"
import Box from '@mui/material/Box'

export default function AppLayout() {

    return (
        <Box sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            boxSizing: 'border-box'
        }}>
            <Navbar />
            <Box sx={{
                flex: '1',
                overflowY: 'scroll'
            }}>
                <Outlet />
            </Box>    
        </Box>
    )
    
}