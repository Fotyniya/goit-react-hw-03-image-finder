import { Component } from 'react';

import axios from 'axios';
import toast from 'react-hot-toast';

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
        error: null,
        perPage: 12,
        page: 1, 
    };
    
componentDidUpdate(prevProps, prevState) {
   
    if ((prevProps.textSearch !== this.props.textSearch)&&(prevState.page !== this.state.page)){
        this.setState({data: [], page: 1,});
        setTimeout(()=>{
            this.loadGallery();
    }, 500)
    } else if ((prevProps.textSearch !== this.props.textSearch)&&(prevState.page === this.state.page)){
        this.setState({data: [], page: 1,});
        setTimeout(()=>{
            this.loadGallery();
    }, 500)
        
    } else if (prevState.page !== this.state.page) {
        setTimeout(()=>{
            this.loadGallery();
    }, 500)
    } 
    
};    
   
loadGallery = () => {
    const {page, perPage} = this.state;
    this.setState({isLoading: true});
    
    axios.get(`${BASE_URL}?q=${this.props.textSearch}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`)
        .then((response) => {
            if (response.data.totalHits === 0) {
                this.setState ({ error: "Error! Try again!" });
                return toast.error("Error! Try again!");
            }
            this.setState((prevState) => ({
                totalHits: response.data.totalHits,
                data: [...prevState.data, ...response.data.hits], 
            }));
        })
        .catch((error) => this.setState({error}))
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
    const {data, isLoading, totalHits, page, perPage} = this.state;
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
