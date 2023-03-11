import { Component } from 'react';
import PropTypes from 'prop-types';
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
        page: 1,
    };

componentDidUpdate(prevProps, prevState) {
   
    if (prevProps.textSearch !== this.props.textSearch) {
        this.setState({data: []});
        this.loadGallery(this.props.page);
    } else {
        if (prevState.page !== this.state.page) {
            this.loadGallery(this.state.page); 
        }
    }
};

loadGallery = (page) => {

    this.setState({isLoading: true});
    
    axios.get(`${BASE_URL}?q=${this.props.textSearch}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
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
    const {data, isLoading, totalHits} = this.state;
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
        {totalHits > 0 && <Button onClick = {this.loadMore} />}
        </>
    )}
};

ImageGallery.propTypes = {
    page: PropTypes.number.isRequired,
    textSearch: PropTypes.string.isRequired,
}