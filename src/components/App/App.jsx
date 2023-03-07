import { Component } from "react";
import { Toaster } from 'react-hot-toast';
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Searchbar } from "../Searchbar";

export class App extends Component {
  state = {
    textSearch: '',
  };

  handleSubmit = (textSearch) => {
    this.setState({textSearch})
  };

  render(){
    return (
      <div>
       <Toaster/>
       <Searchbar onSearch = {this.handleSubmit}/>
       <ImageGallery textSearch = {this.state.textSearch} />
      </div>
    );
  }
};
