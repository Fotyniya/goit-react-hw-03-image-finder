import { IoMdCloseCircleOutline } from 'react-icons/io';
import { Overlay, ModalWindow, LargeImg, Btn } from "../Modal/Modal.styled";

export const Modal = ({content, onClose}) => {
    
    return <>
    <Overlay onClick = {onClose} >
        <ModalWindow >
        <LargeImg src={content.largeImageURL} alt={content.tags} />
            <Btn type="button" onClick = {onClose}><IoMdCloseCircleOutline size = {30} /></Btn>
        </ModalWindow>
    </Overlay>
    </>
}