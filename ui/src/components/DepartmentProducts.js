import React, {Component} from 'react';
import {
    Grid,
    Row,
    Image,
    Col,
    SplitButton,
    MenuItem,
    OverlayTrigger
} from 'react-bootstrap';
import store from '../images/store.jpg';
import fruit from '../images/fruit.jpg';
import medicine from '../images/medicine.jpg';
import '../App.css';
import ProductPopover from './ProductPopover.js';
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
        var count = 0;
        return (
            <div className="departmentProducts">
                <h2>{this.props.department} Department</h2>
                <SplitButton bsStyle={'danger'} title={'Sort by'}>
                    <MenuItem onSelect={e => this.onSort(e, 'price', 'asc')}>Price: Low to High</MenuItem>
                    <MenuItem onSelect={e => this.onSort(e, 'price', 'desc')}>Price: High to Low</MenuItem>
                </SplitButton>
                <Grid fluid={true}>
                    <Row className="productsGrid">
                        {this
                            .state
                            .products
                            .map((product) => {
                                count++; // If we hit a multiple of 3 move the popover to the left
                                return <Col xs={6} md={4} key={product.pid}>
                                    <OverlayTrigger
                                        trigger={['hover', 'focus']}
                                        placement={count % 3 == 0
                                        ? 'left'
                                        : 'right'}
                                        overlay={ProductPopover(product)}>
                                        <Image
                                            src={require(`../images/${product.description.toLowerCase()}.jpg`)}
                                            className="productThumb center-block"
                                            alt="product"
                                            responsive/>
                                    </OverlayTrigger>

                                    <h3>{_.startCase(product.description)}<br/>${Number(product.price).toFixed(2)}
                                        ({product.xFor} {product.unit})</h3>
                                </Col>;
                            })}
                    </Row>
                </Grid>

            </div>
        );
    }
}