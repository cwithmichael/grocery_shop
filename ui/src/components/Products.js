import React, {Component} from 'react';
import {
    Grid,
    Row,
    Image,
    Col,
    SplitButton,
    MenuItem
} from 'react-bootstrap';
import '../App.css';
import NotFound from './NotFound.js';
var _ = require('lodash');

export default class Products extends Component {
    constructor(props) {
        super(props);

        this.onSort = this
            .onSort
            .bind(this)
    }

    onSort(event, sortKey, direction) {
        const data = this.props.data;
        if (Array.isArray(this.props.data)) {
            if (direction === "asc") 
                data.sort((a, b) => a[sortKey] - b[sortKey])
            else 
                data.sort((a, b) => b[sortKey] - a[sortKey])
        }
        this.setState({data})
    }

    render() {
        if (this.props.notFound || !this.props.data || this.props.data.length < 1) {
            return <NotFound/>
        }

        return (
            <div className="Products">
                <h2>Products</h2>
                <SplitButton bsStyle={'danger'} title={'Sort by'} id={1}>
                    <MenuItem onSelect={e => this.onSort(e, 'price', 'asc')}>Price: Low to High</MenuItem>
                    <MenuItem onSelect={e => this.onSort(e, 'price', 'desc')}>Price: High to Low</MenuItem>
                </SplitButton>
                <Grid fluid={true}>
                    <Row className="productsGrid">
                        {Array.isArray(this.props.data)
                            ? this
                                .props
                                .data
                                .map((product) => <Col xs={6} md={4} key={product.pid}>
                                    <Image
                                        src={require(`../images/${product.description.toLowerCase()}.jpg`)}
                                        className="productThumb center-block"
                                        alt="product"
                                        responsive/>
                                    <h3>{_.startCase(product.description)}<br/>${Number(product.price).toFixed(2)}
                                        ({product.xFor} {product.unit})<br/>{_.startCase(product.department)}</h3>
                                </Col>)
                            : <Col xs={6} md={4} key={this.props.data.pid}>
                                <Image
                                    src={require(`../images/${this.props.data.description.toLowerCase()}.jpg`)}
                                    className="productThumb center-block"
                                    alt="product"
                                    responsive/>
                                <h3>{_.startCase(this.props.data.description)}<br/>${Number(this.props.data.price).toFixed(2)}
                                    ({this.props.data.xFor} {this.props.data.unit})<br/>{_.startCase(this.props.data.department)}</h3>
                            </Col>}
                    </Row>
                </Grid>

            </div>
        )
    }
}