import { useEffect, useState } from "react"
import Table from "../components/Table"
import { getTables } from "../services/tables"
import { Box, Grid, Typography  } from "@mui/material"

export default function TablePage() {
    const [tables, setTables] = useState([])
    
    useEffect(() => {
        getTables()
            .then(data => {
                setTables(data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <Box sx={{
            width: '100%',
            minHeight: '100%',
            padding: '1%'
        }}>
            <Typography sx={{
                fontWeight: 'bold',
                fontSize: '2.5rem'
            }}>
                Dine In Table
            </Typography>
            <Box sx={{
                width: '100%',
                height: '4px',
                bgcolor: 'black'
            }} />
            <Grid 
                sx={{marginTop: '10px'}}
                container  
                rowSpacing={4} 
                columnSpacing={3} 
                columns={{xs: 15, sm: 20, md: 30, xl: 40}}>
                {tables.map((table) => (
                    <Grid key={table.table_id} size={5}>
                        <Table table={table}/>
                    </Grid>
                ))}
                
            </Grid>
        </Box>
    )
}