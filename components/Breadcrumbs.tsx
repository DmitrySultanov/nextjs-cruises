import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

type BreadcrumbsProps = {
    children?: React.ReactNode
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({children}) => {
    const router = useRouter()

    return (
        <Box className="breadcrumbs">
            <Typography component="span" onClick={() => router.back()}><FontAwesomeIcon icon={faArrowLeft} /> Назад</Typography>
            {children}
        </Box>
    );
}

export default Breadcrumbs;
