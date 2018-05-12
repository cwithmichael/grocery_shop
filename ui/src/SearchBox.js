import React, {Component} from 'react';
import {FormGroup, FormControl, HelpBlock, Button} from 'react-bootstrap';

export default class SearchBox extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this
            .handleChange
            .bind(this);

        this.state = {
            value: ''
        };
    }

    getValidationState() {
        const length = this.state.value.length;
        if (length > 10) 
            return 'success';
        else if (length > 5) 
            return 'warning';
        else if (length > 0) 
            return 'error';
        return null;
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    render() {
        return (
            <div>
            <div className="col-xs-4"></div>
            <form className="col-xs-4">
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}>
                    <HelpBlock>Search for Products</HelpBlock>
                    <FormControl
                        type="text"
                        value={this.state.value}
                        placeholder=""
                        onChange={this.handleChange}/>
                    <FormControl.Feedback/>
                </FormGroup>
                <Button type="submit" className="btn btn-danger">Submit</Button>
            </form>
            <div className="col-xs-4"></div>
            </div>
        );
    }
}