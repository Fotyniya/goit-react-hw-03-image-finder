import { Component } from 'react';
import { Modal } from '../Modal/Modal'
import {Image} from '../ImageGalleryItem/ImageGalleryItem.styled'

export class ImageGalleryItem extends Component {
    state = {
        isModalOpen: false,
        keyCode: '',
    };

    openModal = () => {
        this.setState( {isModalOpen: true});
        window.addEventListener( 'keydown' , (event) => {
            console.log(event.code);
            this.setState({keyCode: event.code})})
    };

    // closeModal = () => {
    //     this.setState( 
    //     {isModalOpen: false});}

    // closeModalByEsc = () => {
    //     if ((this.state.isModalOpen) || (this.state.keyCode === "Escape")){
    //         this.setState({isModalOpen: false})
    //     }
    //        return
    //     }
    closeModal = () => {
             if ((this.state.isModalOpen)){
                if (this.state.keyCode === "Escape"){
                    this.setState({isModalOpen: false})
                } this.setState({isModalOpen: false})
             }
                
             }   

    render (){
        const {item} = this.props;
        
        return <>
            <Image src={item.webformatURL} alt={item.tags} onClick = {this.openModal} />
            {this.state.isModalOpen && <Modal onClose = {this.closeModal} content = {this.props.item} />}
        </>   
    } 
}
