import { Box } from "@mui/material";
import { useParams } from "react-router";
import { getTableOrder } from "../services/tables";
import { useEffect } from "react";


export default function OrderPage() {
    let params = useParams();
    const tableId = params.tableId

    useEffect(() => {
        getTableOrder(tableId)
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            })
    })
    return (
        <Box>
            {tableId}
        </Box>
    )
}