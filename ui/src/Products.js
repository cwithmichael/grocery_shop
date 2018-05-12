import React, {Component} from 'react';
import {
    Grid,
    Row,
    Image,
    Col,
    SplitButton,
    MenuItem
} from 'react-bootstrap';
import store from './store.jpg';
import fruit from './fruit.jpg';
import medicine from './medicine.jpg';
import './App.css';

export default class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            image: null,
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
        if (this.props.department.toLowerCase() === "produce") {
            this.setState({image: fruit})
        } else if (this.props.department.toLowerCase() === "grocery") {
            this.setState({image: store})
        } else {
            this.setState({image: medicine})
        }
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
                <SplitButton bsStyle={'default'} title={'Sort by'}>
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
                                    src={this.state.image}
                                    className="productThumb"
                                    alt="product"
                                    responsive/>
                                <h3>{product.description}<br/>${Number(product.price).toFixed(2)}<br/>{product.xFor} {product.unit}</h3>
                            </Col>)}
                    </Row>
                </Grid>

            </div>
        );
    }
}