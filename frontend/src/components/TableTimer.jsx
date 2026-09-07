import { Typography } from "@mui/material";
import { useEffect, useState } from "react";


export default function TableTimer({startTime}) {
    const [elapsed, setElapsed] = useState(() => Date.now() - startTime);

    useEffect(() => {
        const interval = setInterval(() => {
            setElapsed(Date.now() - startTime)
        }, 1000)

        return () => clearInterval(interval)
    }, [startTime])

    const formatDuration = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':');
    };

    return (
        <Typography sx={{
            fontWeight: 'medium',
            fontSize: '1em',
            lineHeight: 1
        }}>
            {formatDuration(elapsed)}
        </Typography>
    )
}