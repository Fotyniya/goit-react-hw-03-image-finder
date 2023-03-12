import { Component } from 'react';

import axios from 'axios';
import toast from 'react-hot-toast';

import { Loader } from  '../Loader'
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import {Gallery} from '../ImageGallery/ImageGallery.styled';

const API_KEY = '32817596-3735423159e4b61dcdcaf4a45';
const BASE_URL = 'https://pixabay.com/api/';
let page = 1;
const perPage = 12;
let data = [];
let totalHits = 0;

export class ImageGallery extends Component{
    state = {
        isLoading: false,
        error: null,
    };

componentDidUpdate(prevProps, prevState) {
    if ((prevProps.textSearch !== this.props.textSearch)&&(prevState.page === this.state.page)){
      
        data = []
        page = 1
        setTimeout(()=>{
            this.loadGallery();
        }, 500)
    }
} 


loadGallery = () => {
   
    this.setState({isLoading: true});
    
    axios.get(`${BASE_URL}?q=${this.props.textSearch}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`)
        .then((response) => {
            if (response.data.totalHits === 0) {
                this.setState ({ error: "Error! Try again!" });
                return toast.error("Error! Try again!");
            }
                data = [...data, ...response.data.hits] 
                totalHits = response.data.totalHits
        })
        .catch((error) => this.setState({error}))
        .finally(() => {
            this.setState({isLoading: false})
        });
};

loadMore = () => {
    page++
    this.loadGallery()
  };

render() {
    const { isLoading } = this.state;
    return (
        <>
        {isLoading && <Loader />}
        <Gallery>
            {data && data.map(item => 
                <li key = {item.id}>
                <ImageGalleryItem item = {item} />  
                </li>
            )}
        </Gallery>
        {((totalHits > 0)&&(page < totalHits/perPage)) && <Button onClick = {this.loadMore} />}
        </>
    )}
};
