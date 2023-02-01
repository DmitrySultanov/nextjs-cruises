import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Box } from '@mui/material';
import classNames from 'classnames';


const Layout = ({children, pageClass}) => {
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
