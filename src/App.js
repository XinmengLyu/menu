import React from 'react';
import axios from 'axios';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {
        isLoading: false,
        data: [],
        error: null
      },
      detail: {
        isLoading: false,
        data: [],
        error: null,
      }
    };
  }
  componentDidMount() {
    this.setState({
      category: {
        isLoading: true
      }
    });
    axios.get("http://stream-restaurant-menu-svc.herokuapp.com/category")
      .then(res => {
        this.setState({
          category: {
            isLoading: false,
            data: res.data,
            error: null
          }
        });
      })
      .catch(error => {
        this.setState({
          category: {
            isLoading: false,
            error: error,
          }
        });
      });
  }

  handleClick = () => {};

  render() {
    const {category: {data, isLoading}} = this.state;
    return (
      <div className="App">
        <h1>Menu Categories</h1>
        <div className="category">
          {isLoading? <h2>Loading...</h2> : <ul>
            {data.map((c, i) => {
              return <li key={i} onClick={this.handleClick}>{c.name}</li>
            })}
          </ul>}
        </div>
      </div>
    );
  }

}

export default App;
