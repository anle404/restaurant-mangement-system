import { Box, InputBase } from "@mui/material";
import { useRef } from "react";


export default function SearchBar({sx}) {
    const inputRef = useRef(null);

    return (
        <Box sx={{
            width: '100%',
            border: '1px solid',
            borderRadius: '4px',
            padding: '0.5% 1%',
            display: 'flex',
            alignItems: 'center',
            fontSize: '1rem',
            ...sx
        }} onClick={() => inputRef.current?.focus()}>
            <Box sx={{
                display: 'inline',
                marginRight: '1.5%',
            }}>
                <i className="ri-search-line text-[1.1em]"></i>
            </Box>
            <InputBase placeholder='Search...' inputRef={inputRef} sx={{
                width: '100%',
                fontSize: '1.1em'
            }} />
        </Box>
    )
}