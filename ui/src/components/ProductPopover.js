import React from 'react';
import {
    Popover
} from 'react-bootstrap';
import '../App.css';
var _ = require('lodash');


export default function ProductPopover(product) {
    return (<Popover id="popover-trigger-hover-focus" title="Product Details">
      <h5>{`Product Id: ${product.pid}`}</h5>
      <h5>{`Department: ${product.department}`}</h5>
      <h5>{`Description: ${_.capitalize(product.description.trim().replace("_", " "))}`}</h5>
      <h5>{`Price: ${product.price}`}</h5>
      <h5>{`Cost: ${product.cost}`}</h5>
      <h5>{`Unit: ${product.unit}`}</h5>
      <h5>{`Last Date Sold: ${product.lastSold}`}</h5>
      <h5>{`Shelf Life: ${product.shelfLife}`}</h5>
    </Popover>)
};
