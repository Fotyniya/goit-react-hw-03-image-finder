import { Component } from 'react';
import { Modal } from '../Modal/Modal'
import {Image} from '../ImageGalleryItem/ImageGalleryItem.styled'

export class ImageGalleryItem extends Component {
    state = {
        isModalOpen: false,
    };

    openModal = () => {
        this.setState( {isModalOpen: true});
        window.addEventListener( 'keydown' , (event) => {
            if (event.code === "Escape"){ this.setState({isModalOpen: false})}})
    };
    
    closeModal = () => {
             this.setState({isModalOpen: false})
             }  

    render (){
        const {item} = this.props;
        
        return <>
            <Image src={item.webformatURL} alt={item.tags} onClick = {this.openModal} />
            {this.state.isModalOpen && <Modal onClose = {this.closeModal} content = {this.props.item} />}
        </>   
    } 
}
