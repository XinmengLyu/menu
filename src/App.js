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
        sn: "",
        data: [],
        error: null,
      }
    };
  }
  componentDidMount() {
    this.setState({
      category: {
        isLoading: true,
        data: this.state.category.data,
        error: null
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

  handleClick = (sn) => {
    this.setState({
      detail: {
        isLoading: true,
        sn: this.state.detail.sn,
        data: this.state.detail.data,
        error: null,
      }
    });
    axios.get(`https://stream-restaurant-menu-svc.herokuapp.com/item?category=${sn}`)
      .then(res => {
        // console.log(res);
        this.setState(
          {
            detail: {
              isLoading: false,
              sn: sn,
              data: res.data,
              error: null
            }
          }
        );
      })
      .catch(error => {
        this.setState(
          {
            detail: {
              isLoading: false,
              sn: this.state.detail.sn,
              data: this.state.detail.data,
              error: error
            }
          }
        );
      });
  };

  render() {
    const { category: { data, isLoading }, detail } = this.state;
    return (
      <div className="App">
        <div className="head">
          <h1>Menu Categories</h1>
          <div className="category">
            {isLoading ? <h2>Loading...</h2> : <ul>
              {data.map((c, i) => {
                return <li key={i} onClick={() => this.handleClick(c.short_name)}>{`${c.name} - (${c.short_name})`}</li>
              })}
            </ul>}
          </div>
        </div>
        {detail.data.length ? <div className="items">
          <h2>{`Items in Category: (${detail.sn})`}</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {detail.data.map((d, i) => {
                return (
                  <tr key={i}>
                    <td>{d.name}</td>
                    <td>{d.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div> : null}
      </div>
    );
  }

}

export default App;
