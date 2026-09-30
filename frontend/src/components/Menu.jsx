import { Box, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import MenuGrid from "./MenuGrid";
import { useEffect, useMemo, useState } from "react";
import { getMenu } from "../services/menu";


export default function Menu() {
    const [menu, setMenu] = useState([])
    const [query, setQuery] = useState('')

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) {
            return menu
        }

        return menu.filter(item => item.name.toLowerCase().includes(q))
    })

    useEffect(() => {
        getMenu()
            .then(data => {
                console.log(data)
                setMenu(data)
            })
            .catch(error => console.error(error))
    }, [])

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            paddingX: '2.5%',
        }}>
            <Typography sx={{
                fontWeight: 'bold',
                fontSize: '2rem',
                lineHeight: 1.5
            }}>
                Menu
            </Typography>
            <Box sx={{
                width: '100%',
                height: '3px',
                bgcolor: 'black'
            }} />
            <SearchBar sx={{marginTop: '15px'}} query={query} setQuery={setQuery} />
            <MenuGrid sx={{marginTop: '15px'}} menu={filtered} />
        </Box>
    )
}