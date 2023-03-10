import { Component } from "react";
import toast from 'react-hot-toast';
import { BsSearch } from 'react-icons/bs';
import { SearchContainer, SearchFormButton, SearchForm, SearchFormInput, SearchFormLabel } from "../Searchbar/Searchbar.styled"

export class Searchbar extends Component {
    state = {
        value: ''
    };

    handleChange = ({target: {value}}) => {
        this.setState({value})
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if(!this.state.value.trim()){
          return toast.error('This is an error! Enter a search query!');
        }
        this.props.onSearch(this.state.value.trim());
        this.setState({value: ''})
    };

    render() {
        return(
        <SearchContainer>
            <SearchForm onSubmit = {this.handleSubmit} className="form">
            <SearchFormButton type="submit" className="button">
                <BsSearch />
            <SearchFormLabel className="button-label">Search</SearchFormLabel>
            </SearchFormButton>

            <SearchFormInput
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value = {this.state.value}
            onChange = {this.handleChange}
            />
            </SearchForm>
        </SearchContainer>
        )
    }
}