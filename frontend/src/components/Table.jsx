import tableUnoccupied from "../assets/table-unoccupied.svg"
import tableOccupied from "../assets/table-occupied.svg"
import { Box, Typography } from "@mui/material"
import TableTimer from "./TableTimer"
import { useNavigate } from "react-router"

export default function Table({table}) {
    const navigate = useNavigate()

    return (
        <Box sx={{
            width: '100%',
            containerType: 'inline-size',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            color: table.order_id ? 'white' : 'black'
        }} onClick={() => navigate(`./${table.table_id}`)}>
            <img src={table.order_id ? tableOccupied : tableUnoccupied} className="rotate-90" width="100%" height="100%" />
            <Box sx={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                textAlign: 'center',
                fontSize: '10cqw'
            }}>
                <Typography sx={{
                    fontSize: '1em',
                    fontWeight: 'bold',
                    lineHeight: 1,
                    whiteSpace: 'nowrap'
                }}>
                    {table.label} | {table.seats} seats
                </Typography>
                {(table.order_id) && (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.5
                    }}>
                        <Typography sx={{
                            fontWeight: 'medium',
                            fontSize: '1em',
                            lineHeight: 1
                        }}>
                            {table.total} $
                        </Typography>
                        <TableTimer startTime={Date.parse(table.opened_at)} />
                    </Box>
                )}
            </Box>
        </Box>
    )
}