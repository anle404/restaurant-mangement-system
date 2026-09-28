import { Box, Grid } from "@mui/material";
import DishCard from "./DishCard";


export default function MenuGrid({sx, menu}) {
    return (
        <Box sx={{
            width: '100%',
            height: '83%',
            flexGrow: 1,
            overflowY: 'scroll',
            scrollbar: 'hidden',
            ...sx
        }}>
            <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 12, md: 20 }}>
                {menu?.map(menuItem => (
                    <Grid key={menuItem.menu_item_id} size={{ xs: 2, sm: 4, md: 4 }}>
                        <DishCard menuItem={menuItem} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}