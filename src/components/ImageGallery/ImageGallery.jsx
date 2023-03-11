import { Component } from 'react';
import axios from 'axios';
//import { nanoid } from 'nanoid'

import { Loader } from  '../Loader'
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import {Gallery} from '../ImageGallery/ImageGallery.styled';

const API_KEY = '32817596-3735423159e4b61dcdcaf4a45';
const BASE_URL = 'https://pixabay.com/api/';

export class ImageGallery extends Component{
    state = {
        data: '',
        totalHits: 0,
        isLoading: false,
        errorMsg: '',
        page: 1,
    };

componentDidUpdate(prevProps, prevState) {
    if (prevProps.textSearch !== this.props.textSearch) {
        this.setState({ page: 1, data: ''});
        this.loadGallery();
    } else if (prevState.page !== this.state.page){
        this.loadGallery();
    }
};

loadGallery = () => {
    const {page} = this.state;
    this.setState({isLoading: true});
    
    axios.get(`${BASE_URL}?q=${this.props.textSearch}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        .then((response) => {
            
            this.setState((prevState) => ({
                data: [...prevState.data, ...response.data.hits], 
            }))
        })
        .catch((error) => this.setState({
            errorMsg: error
          }))
        .finally(() => {
            this.setState({isLoading: false})
        });
};

loadMore = () => {
    this.setState((prevState) => ({
        page: prevState.page + 1
    }));
  };

render() {
    return (
        <>
        {this.state.isLoading && <Loader />}
        {this.state.data && <Gallery>
        {this.state.data.map(item => 
            <li key = {item.id}>
            <ImageGalleryItem item = {item} />  
            </li>
        )}
        {this.state.data && <Button onClick = {this.loadMore} />}
        </Gallery>}
        
        </>
    )}
}