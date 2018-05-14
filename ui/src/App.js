import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import store from './images/store.jpg';
import fruit from './images/fruit.jpg';
import medicine from './images/medicine.jpg';
import './App.css';
import SearchBox from './components/SearchBox.js';
import DepartmentGrid from './components/DepartmentGrid.js';
import DepartmentProducts from './components/DepartmentProducts.js';
import NavigationMenu from './components/NavigationMenu.js';
import Products from './components/Products.js';
import NotFound from './components/NotFound.js';
import About from './components/About.js';

import {Route} from 'react-router-dom';

class App extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this
            .handleChange
            .bind(this);

        this.handleSubmit = this
            .handleSubmit
            .bind(this);
        this.checkDepartments = this
            .checkDepartments
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
        this.searchWithFilters = this
            .searchWithFilters
            .bind(this);

        this.state = {
            departments: [
                {
                    id: 1,
                    title: "produce",
                    thumb: fruit
                }, {
                    id: 2,
                    title: "grocery",
                    thumb: store
                }, {
                    id: 3,
                    title: "pharmacy",
                    thumb: medicine
                }
            ],
            isLoading: false,
            value: '',
            data: null,
            notFound: false,
            filtersPresent: new Set()
        };
    }

    handleDepartmentSelection(e) {
        console.log(e.target.value);
        this.setState({
            filtersPresent: [
                ...this.state.filtersPresent, {
                    attr: 'department',
                    val: e.target.value
                }
            ]
        });
    }

    handlePriceRangeSelection(e) {
        console.log(e.target.value);
        this.setState({
            filtersPresent: [
                ...this.state.filtersPresent, {
                    attr: 'price',
                    val: e.target.value
                }
            ]
        });
    }

    handleLatestDateSelection(e) {
        console.log(e.target.value);
        this.setState({
            filtersPresent: [
                ...this.state.filtersPresent, {
                    attr: 'latestDate',
                    val: e.target.value
                }
            ]
        });
    }

    handleShelfLifeSelection(e) {
        console.log(e.target.value);
        this.setState({
            filtersPresent: [
                ...this.state.filtersPresent, {
                    attr: 'shelfLife',
                    val: e.target.value
                }
            ]
        });
    }

    handleUnitSelection(e) {
        console.log(e.target.value);
        this.setState({
            filtersPresent: [
                ...this.state.filtersPresent, {
                    attr: 'unit',
                    val: e.target.value
                }
            ]
        });
    }

    handleCostRangeSelection(e) {
        console.log(e.target.value);
        this.setState({
            filtersPresent: [
                ...this.state.filtersPresent, {
                    attr: 'cost',
                    val: e.target.value
                }
            ]
        });
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.filtersPresent.size < 1) {
            // If all numbers then assume searching by PID
            if (this.state.value.match(/^[0-9]+$/) != null) {
                console.log(this.state.value);
                fetch('http://localhost:8080/api/products/search/findByPid?pid=' + this.state.value).then(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        if (res.status === 404) {
                            this.setState({notFound: true});
                        }
                        return Promise.reject({status: res.status});
                        }
                    })
                    .then(res => this.setState({data: res, notFound: false}))
                    .catch(err => this.setState({
                        data: {
                            error: err.status
                        }
                    }));
            } else if (this.state.value.match(/^[A-Za-z]+$/) != null) {
                // If all letters then assume searching by description and if that fails then
                // try searching by department;
                console.log(this.state.value);
                fetch('http://localhost:8080/api/products/search/findByDescriptionLike?description=' + this.state.value).then(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        return Promise.reject({status: res.status});
                    }
                }).then(res => {
                    if (res && res._embedded.products.length > 0) {
                        this.setState({data: res._embedded.products, notFound: false})
                    } else {
                        return Promise.reject({status: res.status});
                    }
                }).catch(err => {
                    this
                        .checkDepartments()
                        .then(res => this.setState({data: res._embedded.products, notFound: false}))
                        .catch(err => this.setState({data: [], notFound: false}));
                });

            }
        } else {
            this
                .searchWithFilters()
                .then(res => this.setState({data: res._embedded.products, notFound: false}))
                .catch(err => this.setState({data: [], notFound: false}));
        }
        this.setState({filtersPresent: new Set()});

    }

    checkDepartments() {
        var query = this.state.value;
        console.log('here');
        return fetch('http://localhost:8080/api/products/search/findByDepartmentLike?department=' + query).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                if (res.status === 404) {
                    this.setState({data: [], notFound: true});
                }
                return Promise.reject({status: res.status});
            }
        });

    }

    searchWithFilters() {
        console.log("Searching with filters" + this.state.filtersPresent);
        var fetchUrl = 'http://localhost:8080/api/products/search/';
        if (this.state.filtersPresent.length == 1) {
            if (this.state.filtersPresent[0].attr === "price") {
                fetchUrl += 'findByDescriptionLikeAndPriceBetween?description=' + this.state.value;
                if (this.state.filtersPresent[0].val === "zero_two") {
                    fetchUrl += '&priceStart=0&priceEnd=2';
                } else if (this.state.filtersPresent[0].val === "two_four") {
                    fetchUrl += '&priceStart=2&priceEnd=4';
                } else {
                    fetchUrl += '&priceStart=4&priceEnd=999999999'
                }
            }
            return fetch(fetchUrl).then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    if (res.status === 404) {
                        this.setState({data: [], notFound: true});
                    }
                    return Promise.reject({status: res.status});
                }
            });
        } else {
            fetchUrl += 'findByDescriptionlike?description=' + this.state.value;
            return fetch(fetchUrl).then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    if (res.status === 404) {
                        this.setState({data: [], notFound: true});
                    }
                    return Promise.reject({status: res.status});
                }
            });

        }
        /*this
            .state
            .filtersPresent
            .forEach((el) => {
                console.log(el);
            });*/

    }

    render() {
        return (
            <div className="App">
                <Grid fluid={true}>
                    <Row>
                        <NavigationMenu/>
                    </Row>
                    <Row>
                        <Col>
                            <SearchBox
                                className="searchBox"
                                state={this.state}
                                handleDepartmentSelection={this.handleDepartmentSelection}
                                handlePriceRangeSelection={this.handlePriceRangeSelection}
                                handleLatestDateSelection={this.handleLatestDateSelection}
                                handleShelfLifeSelection={this.handleShelfLifeSelection}
                                handleUnitSelection={this.handleUnitSelection}
                                handleCostRangeSelection={this.handleCostRangeSelection}
                                handleChange={this.handleChange}
                                handleSubmit={this.handleSubmit}/>
                        </Col>
                    </Row>
                    {this.state.data
                        ? <Row className="productsGrid"><Products
                                data={this.state.data}
                                notFound={this.state.notFound}
                                fetchAll={false}/>
                            </Row>
                        : <Row className="departmentsGrid">
                            <Route
                                exact
                                path='/'
                                render={() => <DepartmentGrid departments={this.state.departments}/>}/>
                            <Route
                                exact
                                path='/view/Produce'
                                render={() => <DepartmentProducts department={'produce'}/>}/>
                            <Route
                                exact
                                path='/view/Grocery'
                                render={() => <DepartmentProducts department={'grocery'}/>}/>
                            <Route
                                exact
                                path='/view/Pharmacy'
                                render={() => <DepartmentProducts department={'pharmacy'}/>}/>
                            <Route exact path='/view/About' render={() => <About/>}/>

                        </Row>}

                </Grid>
                <footer>&copy; 2018 Michael's Shop</footer>

            </div>
        );
    }
}

export default App;
