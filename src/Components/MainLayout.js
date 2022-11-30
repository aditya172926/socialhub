import {Button} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/auth';
import ConnectLens from './ConnectLens';

const MainLayout = () => {
    const authContext = useContext(AuthContext);

    if (!authContext.userLens?.profile) {
        
        return (
            <ConnectLens openModal = {true} />
        );
    }
}
export default MainLayout;