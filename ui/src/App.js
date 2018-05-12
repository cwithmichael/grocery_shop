import React, {Component} from 'react';
import {Button, Grid, Row, Col} from 'react-bootstrap';
import store from './store.jpg';
import fruit from './fruit.jpg';
import medicine from './medicine.jpg';
import './App.css';
import SearchBox from './SearchBox.js';
import DepartmentGrid from './DepartmentGrid.js';
import Products from './Products.js';
import NavigationMenu from './NavigationMenu.js';
import {Route} from 'react-router-dom';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            departments: [
                {
                    id: 1,
                    title: "Produce",
                    thumb: fruit
                }, {
                    id: 2,
                    title: "Grocery",
                    thumb: store
                }, {
                    id: 3,
                    title: "Pharmacy",
                    thumb: medicine
                }
            ],
            isLoading: false
        };
    }

    render() {

        return (
            <div className="App">
                <Grid fluid={true}>
                    <Row>
                        <NavigationMenu/>
                    </Row>
                    <Row className="departmentsGrid">
                        <Route
                            exact
                            path='/'
                            render={() => <DepartmentGrid departments={this.state.departments}/>}/>
                        <Route
                            exact
                            path='/view/Produce'
                            render={() => <Products department={'Produce'}/>}/>
                        <Route
                            exact
                            path='/view/Grocery'
                            render={() => <Products department={'Grocery'}/>}/>
                        <Route
                            exact
                            path='/view/Pharmacy'
                            render={() => <Products department={'Pharmacy'}/>}/>

                    </Row>

                    <Row>
                        <Col>
                            <SearchBox className="searchBox"/>
                            <Button>Search</Button>
                        </Col>
                    </Row>
                </Grid>

            </div>
        );
    }
}

export default App;
