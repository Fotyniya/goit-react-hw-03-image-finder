import { Component } from "react";
import toast from 'react-hot-toast';

export class Searchbar extends Component {
    state = {
        value: ''
    };

    handleChange = ({target: {value}}) => {
        this.setState({value})
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if(!this.state.value){
          return toast.error('This is an error! Enter a search query!');
        }
        this.props.onSearch(this.state.value);
        this.setState({value: ''})
    };

    render() {
        return(
        <div>
            <form onSubmit = {this.handleSubmit} className="form">
            <button type="submit" className="button">
            <span className="button-label">Search</span>
            </button>

            <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value = {this.state.value}
            onChange = {this.handleChange}
            />
            </form>
        </div>
        )
    }
}