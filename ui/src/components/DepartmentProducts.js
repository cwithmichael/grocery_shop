import React, {Component} from 'react';
import {
    Grid,
    Row,
    Image,
    Col,
    SplitButton,
    MenuItem
} from 'react-bootstrap';
import store from '../images/store.jpg';
import fruit from '../images/fruit.jpg';
import medicine from '../images/medicine.jpg';
import '../App.css';
var _ = require('lodash');

export default class DepartmentProducts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            isLoading: false
        };

        this.onSort = this
            .onSort
            .bind(this)

    }

    onSort(event, sortKey, direction) {
        const data = this.state.products;
        if (direction === "asc") 
            data.sort((a, b) => a[sortKey] - b[sortKey])
        else 
            data.sort((a, b) => b[sortKey] - a[sortKey])
        this.setState({data})
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
            <div className="DepartmentProducts">
                <h2>{this.props.department}</h2>
                <SplitButton bsStyle={'danger'} title={'Sort by'}>
                    <MenuItem onSelect={e => this.onSort(e, 'price', 'asc')}>Price: Low to High</MenuItem>
                    <MenuItem onSelect={e => this.onSort(e, 'price', 'desc')}>Price: High to Low</MenuItem>
                </SplitButton>
                <Grid fluid={true}>
                    <Row className="productsGrid">
                        {this
                            .state
                            .products
                            .map((product) => <Col xs={6} md={4} key={product.pid}>
                                <Image
                                    src={require(`../images/${product.description.toLowerCase()}.jpg`)}
                                    className="productThumb center-block"
                                    alt="product"
                                    responsive/>
                                <h3>{_.startCase(product.description)}<br/>${Number(product.price).toFixed(2)} ({product.xFor} {product.unit})</h3>
                            </Col>)}
                    </Row>
                </Grid>

            </div>
        );
    }
}