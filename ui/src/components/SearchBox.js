import React, {Component} from 'react';
import {
    FormGroup,
    FormControl,
    HelpBlock,
    Button,
    Row,
    Label,
    DropdownButton,
    MenuItem,
    Form,
    ControlLabel,
    InputGroup,
    Checkbox,
    Modal,
    Radio
} from 'react-bootstrap';
import NotFound from './NotFound.js';
import {Link, BrowserRouter, Redirect} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

export default class SearchBox extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleClick = this
            .handleClick
            .bind(this);

        this.handleModalClose = this
            .handleModalClose
            .bind(this);

        this.state = {
            startDate: moment(),
            showModal: false,
            departmentSelection: 'all',
            priceRangeSelection: 'all',
            latestDateSelection: 'all',
            shelfLifeSelection: 'all',
            unitSelection: 'all',
            costRangeSelection: 'all'
        }

        this.handleDateChange = this
            .handleDateChange
            .bind(this);

        this.handleDepartmentSelection = this
            .handleDepartmentSelection
            .bind(this);
        this.handlePriceRangeSelection = this
            .handlePriceRangeSelection
            .bind(this);
        this.handleLatestDateSelection = this
            .handleLatestDateSelection
            .bind(this);
        this.handleShelfLifeSelection = this
            .handleShelfLifeSelection
            .bind(this);
        this.handleUnitSelection = this
            .handleUnitSelection
            .bind(this);
        this.handleCostRangeSelection = this
            .handleCostRangeSelection
            .bind(this);

    }

    handleDepartmentSelection(e) {
        console.log(e.target.value);
        this.setState({departmentSelection: e.target.value});
    }

    handlePriceRangeSelection(e) {
        console.log(e.target.value);
        this.setState({priceRangeSelection: e.target.value});
    }

    handleLatestDateSelection(e) {
        console.log(e.target.value);
        this.setState({latestDateSelection: e.target.value});
    }

    handleShelfLifeSelection(e) {
        console.log(e.target.value);
        this.setState({shelfLifeSelection: e.target.value});
    }

    handleUnitSelection(e) {
        console.log(e.target.value);
        this.setState({unitSelection: e.target.value});
    }

    handleCostRangeSelection(e) {
        console.log(e.target.value);
        this.setState({costRangeSelection: e.target.value});
    }

    handleDateChange(date) {
        this.setState({startDate: date});
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({showModal: true});
    }

    handleModalClose() {
        this.setState({showModal: false});
    }

    render() {
        return (
            <div className="container">
                <Row>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <FormGroup className="input-group" id="adv-search">
                            <FormControl
                                onChange={this.props.handleChange}
                                componentClass="input"
                                placeholder="Search for products"
                                autoComplete="on"/>
                            <FormGroup className="input-group-btn">
                                <Button bsStyle="default" onClick={this.handleClick}>Filter By</Button>
                                <Modal
                                    className="modal-static"
                                    show={this.state.showModal}
                                    onHide={this.handleModalClose}>
                                    <Modal.Header>
                                        <Modal.Title>Select Filter Options</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>

                                        <Row>
                                            <FormGroup
                                                controlId="formControlsSelect"
                                                onChange={this.handleDepartmentSelection}>
                                                <ControlLabel>Select Department</ControlLabel>
                                                <FormControl componentClass="select" placeholder="Select Department">
                                                    <option value="all">All</option>
                                                    <option value="produce">Produce</option>
                                                    <option value="grocery">Grocery</option>
                                                    <option value="pharmacy">Pharmacy</option>
                                                </FormControl>
                                            </FormGroup>
                                        </Row>
                                        <Row>
                                            <FormGroup controlId="formControlsSelect" onChange={this.handlePriceRangeSelection}>
                                                <ControlLabel>Select Price Range</ControlLabel>
                                                <FormControl componentClass="select" placeholder="Select Price Range">
                                                    <option value="all">All</option>
                                                    <option value="zero_two">$0.00 - $2.00</option>
                                                    <option value="two_four">$2.00 - $4.00</option>
                                                    <option value="four_above">> $4.00</option>
                                                </FormControl>
                                            </FormGroup>
                                        </Row>
                                        <Row>
                                            <ControlLabel>Select Latest Date Sold</ControlLabel>
                                            <DatePicker selected={this.state.startDate} onChange={this.handleDateChange}/>
                                        </Row>
                                        <Row>
                                            <FormGroup controlId="formControlsSelect" onChange={this.handleShelfLifeSelection}> 
                                                <ControlLabel>Select Shelf Life</ControlLabel>
                                                <FormControl componentClass="select" placeholder="Select Shelf Life">
                                                    <option value="all">All</option>
                                                    <option value="zero_three">0 days - 3 days</option>
                                                    <option value="three_seven">3 days - 7 days</option>
                                                    <option value="seven_above">> 7 days</option>
                                                </FormControl>
                                            </FormGroup>
                                        </Row>
                                        <Row>
                                            <FormGroup controlId="formControlsSelect" onChange={this.handleUnitSelection}>
                                                <ControlLabel>Select Unit</ControlLabel>
                                                <FormControl componentClass="select" placeholder="Select Unit">
                                                    <option value="all">All</option>
                                                    <option value="lb">Pounds (lbs)</option>
                                                    <option value="each">1 Each</option>
                                                </FormControl>
                                            </FormGroup>
                                        </Row>
                                        <Row>
                                            <FormGroup controlId="formControlsSelect" onChange={this.handleCostRangeSelection}>
                                                <ControlLabel>Select Cost Range</ControlLabel>
                                                <FormControl componentClass="select" placeholder="Select Cost Range">
                                                    <option value="all">All</option>
                                                    <option value="zero_two">$0.00 - $2.00</option>
                                                    <option value="two_four">$2.00 - $4.00</option>
                                                    <option value="four_above">> $4.00</option>
                                                </FormControl>
                                            </FormGroup>
                                        </Row>

                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button bsStyle="primary" onClick={this.handleModalClose}>Close</Button>
                                    </Modal.Footer>
                                </Modal>
                                <span>
                                    <Button onClick={this.props.handleSubmit} bsStyle="primary">Search
                                    </Button>
                                </span>
                            </FormGroup>
                        </FormGroup>
                    </div>
                </Row>
            </div>
        )
    }
}