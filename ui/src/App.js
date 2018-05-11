import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructor(props) {
	    super(props);

	    this.state = {
	      products: [],
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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
        <h2>Product List</h2>
        {this.state.products.map((product) =>
          <li key={product.ID}>
            {product.description}
          </li>
        )}
      </div>
      </div>
    );
  }
}


export default App;
