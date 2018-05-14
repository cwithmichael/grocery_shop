import React, {Component} from 'react';
import {Image} from 'react-bootstrap';

const NotFound = () => (
    <div>
        <h2>Sorry, unable to locate product</h2>
        <Image src={require('../images/sad.jpg')}/>
    </div>
);

export default NotFound;