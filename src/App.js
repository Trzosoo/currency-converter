import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const api = 'http://api.fixer.io/latest';

class App extends Component {
  constructor() {
    super();

    this.state = {
      base: 'PLN',
      target: 'GBP',
      amount: 100,
      rates: {},
      currencies: [],
    };

    this.handleBaseChange = this.handleBaseChange.bind(this);
    this.handleTargetChange = this.handleTargetChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  componentDidMount() {
    this.apiCall(api, this.state.base);
  }

  apiCall(api, base) {
    return fetch(`${api}?base=${base}`)
      .then(res => res.json())
      .then(res => {
        const rates = res.rates;
        const currencies = [this.state.base, ...Object.keys(res.rates)];
        this.setState({ rates, currencies });
      })
      .catch(error => console.error(new Error(error)));
  }

  handleBaseChange(event) {
    const base = event.target.value;
    this.apiCall(api, base);
    this.setState({ base });
  }

  handleTargetChange(event) {
    const target = event.target.value;
    this.setState({ target });
  }

  handleSwitch() {
    const base = this.state.target;
    const target = this.state.base;
    this.apiCall(api, base);
    this.setState({ base, target });
  }

  handleAmountChange(event) {
    const amount = event.target.value;
    this.setState({ amount });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Currency Converter</h1>
        </header>
        <section className="currency-converter">
          <div className="cc-controls">
            <div>
              <label>Base </label>
              <select value={this.state.base} onChange={this.handleBaseChange}>
                {this.state.currencies.map((currency, index) => (
                  <option value={currency} key={index}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button className="crimson-btn" onClick={this.handleSwitch}>
                Switch
              </button>
            </div>
            <div>
              <label>Target </label>
              <select
                value={this.state.target}
                onChange={this.handleTargetChange}
              >
                {this.state.currencies.map((currency, index) => (
                  <option value={currency} key={index}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Amount </label>
              <input
                type="number"
                name="amount"
                value={this.state.amount}
                onChange={this.handleAmountChange}
              />
            </div>
            <div className="cc-controls-conversion">
              <p>
                {`${Number(this.state.amount).toFixed(2)} ${this.state.base} =`}
              </p>
              <h1>
                {this.state.target === this.state.base
                  ? `${Number(this.state.amount).toFixed(2)} ${
                      this.state.target
                    }`
                  : `${(
                      this.state.amount * this.state.rates[this.state.target] ||
                      this.state.amount
                    ).toFixed(2)} ${this.state.target}`}
              </h1>
            </div>
          </div>
          <div className="cc-currencies">
            {Object.keys(this.state.rates).map(key => {
              return (
                <div className="cc-currencies-rate" key={key}>
                  <div
                    className={key === this.state.target ? 'highlight' : null}
                  >
                    {key}
                  </div>
                  <label>{this.state.rates[key]}</label>
                </div>
              );
            })}
            <div className="remain" />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
