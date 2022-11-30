import { Button, useDisclosure } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useContext, useEffect } from "react";
import AuthContext from "../context/auth";
import useLensAuth from "../hooks/useLensAuth";

const AuthModal = (props) => {
    const authContext = useContext(AuthContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const hookLensAuth = useLensAuth();

    useEffect(() => {
        if (props.openModal) {
            onOpen();
        }
    }, []);

    const template = () => {
        if (!authContext.address) {
            return (<>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Connect Wallet</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Button onClick={authContext.connectWallet}>Connect</Button>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='green' mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>)
        }
    }

    return (
        template()
    )
}
export default AuthModal;