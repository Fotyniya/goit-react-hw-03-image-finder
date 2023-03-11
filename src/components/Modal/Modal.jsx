import { Component } from 'react';
import PropTypes from 'prop-types';
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
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    content: PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }).isRequired,
}