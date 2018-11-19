import React, { Component } from 'react';

export class AskUserPlaceName extends Component{
    constructor(props) {
        super(props);
        this.state = {placeName: ''};
    
        this.handleSetName = this.handleSetName.bind(this);
        this.handleSubmitName = this.handleSubmitName.bind(this);
      }
      handleSetName(event) {
        this.setState({value: event.target.value});
      }
      handleSubmitName(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }
    
    render(){
        return (
            <form onSubmit={this.handleSubmitName}>
            <label>
              Name Place:
              <input type="text" value={this.state.placeName} onChange={this.handleSetName} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
    }
}