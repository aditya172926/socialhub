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
import { useEffect } from "react";

const ConnectLens = (props) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (props.openModal) {
            onOpen();
        }
    }, [])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Connect To Lens</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Button>Sign In</Button>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='green' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
export default ConnectLens;