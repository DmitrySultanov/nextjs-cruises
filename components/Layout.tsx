import React, { FC, ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Box } from '@mui/material';
import classNames from 'classnames';

type layoutProps = {
    children: ReactNode,
    pageClass: string
}


const Layout: FC<layoutProps> = ({children, pageClass}) => {
    return (
        <>
            <Header />
            <Box component="section" className={classNames('main-content', pageClass ? pageClass : '')}>
                {children}
            </Box>
            <Footer />
        </>
    );
}

export default Layout;
