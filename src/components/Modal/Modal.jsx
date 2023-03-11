import { Component } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { Overlay, ModalWindow, LargeImg, Btn } from "../Modal/Modal.styled";

export class Modal extends Component {
      
    clickModal = (event) => {
        event.stopPropagation()
    };

    render () {
        const {onClose, content} = this.props;
    return <>
    <Overlay onClick = {onClose} >
        <ModalWindow onClick = {this.clickModal} >
        <LargeImg src={content.largeImageURL} alt={content.tags} />
            <Btn type="button" onClick = {onClose}><IoMdCloseCircleOutline size = {30} /></Btn>
        </ModalWindow>
    </Overlay>
    </>}
}