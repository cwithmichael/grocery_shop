import React, { Component } from 'react';
import { Button, Grid, Row, Image, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import store from './store.jpg';
import fruit from './fruit.jpg';
import medicine from './medicine.jpg';
import './App.css';
import SearchBox from './SearchBox.js';

class App extends Component {
	constructor(props) {
	    super(props);

	    this.state = {
        products: [],
        departments: [{id: 1, title: "Produce", thumb: fruit}, {id: 2, title: "Groceries", thumb: store}, {id: 3, title: "Pharmacy", thumb: medicine}],
	      isLoading: false
	    };
	  }
	componentDidMount() {
		  this.setState({isLoading: true});

		  fetch('http://localhost:8080/api/products')
		    .then(response => response.json())
		    .then(data => this.setState({products: data._embedded.products, isLoading: false}));
		}
  render() {
	  if (this.state.isLoading) {
	    return <p>Loading...</p>;
	  }
	  
    return (
      <div className="App">
      <Grid fluid={true}>
      <Row className="header">
        <h1 className="App-title">Welcome to Michael's Groceries Shop</h1>
      </Row>
      <Row className="searchBox">
      <SearchBox/>
      <Button>Search</Button>
      </Row>
      <Row className="departmentsGrid">
      <h2>Shop By Department</h2>
      {this.state.departments.map((department) =>
        <Col xs={6} md={4} key={department.id}>
          <h3>{department.title}</h3>
          <Image src={department.thumb} className="App-logo" alt="store" responsive/>
        </Col>
      )}
            </Row>
      </Grid>
        
      </div>
    );
  }
}


export default App;
