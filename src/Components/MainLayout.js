import {Button} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/auth';
import AuthModal from './AuthModal';

const MainLayout = () => {
    const authContext = useContext(AuthContext);

    if (!authContext.address) {
        
    }
    if (!authContext.userLens?.profile || !authContext.address) {
        return (
            <AuthModal openModal = {true} />
        );
    }
}
export default MainLayout;