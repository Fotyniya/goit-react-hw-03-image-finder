import { Component } from 'react';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loader } from  '../Loader'
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import {Gallery} from '../ImageGallery/ImageGallery.styled';

const API_KEY = '32817596-3735423159e4b61dcdcaf4a45';
const BASE_URL = 'https://pixabay.com/api/';

export class ImageGallery extends Component{
    state = {
        data: null,
        loading: false,
    };

componentDidUpdate(prevProps, prevState) {
    if (prevProps.textSearch !== this.props.textSearch){
        this.setState({loading: true})
        axios.get(`${BASE_URL}?q=${this.props.textSearch}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        .then((response) => {
            if (response.status !== 200){
                return Promise.reject (new Error(response.statusText))
            }
            this.setState({data: response.data.hits})
        })
        .catch((error) => {
            console.log (error)
            Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        })
        .finally(() => {
            this.setState({loading: false})
        });
    }
};

render() {
    return (
        <>
        {this.state.loading && <Loader />}
        <Gallery>
        {this.state.data && this.state.data.map(item => 
            <li key = {item.id}>
            <ImageGalleryItem item = {item}/>  
            </li>
        )}
        </Gallery>
        </>
    )}
}