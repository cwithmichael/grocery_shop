import React, {Component} from 'react';

const pStyle = {
    fontFamily: 'serif',
    fontSize: '14px',
    color: 'black'
}

const About = () => (
    <div>
        <h2>Established 1998</h2>
        <p style={pStyle}>
            Our goal is to be the greatest shop in the history of shops</p>
        <br/>
        <p style={pStyle}>
            Contact us @ 555-5555 for any inquiries
        </p>
    </div>
);

export default About;