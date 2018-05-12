import React, { Component } from 'react';
import { Grid, Row, Image, Col} from 'react-bootstrap';
import './App.css';


export default class Product extends Component {
	constructor(props) {
	    super(props);

	    this.state = {
        products: [],
	      isLoading: false
	    };
	  }
	componentDidMount() {
		  this.setState({isLoading: true});

		  fetch('http://localhost:8080/api/products/search/findByDepartment?department=' + this.props.department)
		    .then(response => response.json())
		    .then(data => this.setState({products: data._embedded.products, isLoading: false}));
		}
  render() {
	  if (this.state.isLoading) {
	    return <p>Loading...</p>;
	  }
	  
    return (
      <div className="Products">
      <Grid fluid={true}>
      <Row className="productsGrid">
      {this.state.products.map((product) =>
        <Col xs={6} md={4} key={product.pid}>
          <h3>{product.description}</h3>
          <Image src={product.thumb} className="productThumb" alt="product" responsive/>
        </Col>
      )}
                  </Row>
      </Grid>
        
      </div>
    );
  }
}