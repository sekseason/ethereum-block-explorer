import React, { Component } from 'react';

import client from './feathers';

import logo from './assets/images/logo.svg';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'Offline',
      text: '',
      blocks: []
    };
  }

  componentDidMount() {
    this.serverStatus();
  }

  componentWillUnmount() {
    client.service('blocks').removeListener('newBlock');
  }

  serverStatus() {
    client.io.on('connect', async () => {
      await this.setState({ status: 'Online' });
      this.getBlocks();
    });

    client.io.on('disconnect', async () => {
      await this.setState({ status: 'Offline' });
      this.setState({ blocks: [] });
    });

    client.io.on('reconnect_attempt', async (count) => {
      await this.setState({ status: `Offline (re-connect #${count})` });
      this.setState({ blocks: [] });
    });
  }

  getBlocks() {
    if (!this.state.blocks.length) {
      client.service('blocks')
        .find({
          query: {
            $sort: {
              id: -1
            }
          }
        })
        .then(res => {
          this.setState({ blocks: res.data });
        });
    }

    this.newBlock();
  }

  newBlock() {
    client.service('blocks').on('newBlock', data => {
      let blocks = this.state.blocks;

      if (blocks.length && blocks[0]['id'] !== data.id) {
        blocks.unshift(data);
        this.setState({ blocks: blocks });
      }
    });
  }

  renderBlock = () => {
    let content = [];

    this.state.blocks.forEach((item, index) => {
      content.push(
        <div className="block" key={index}>
          <p>
            ID: {item.id}<br />
            Hash: {item.hash}<br />
            timestamp: {item.timestamp}
          </p>
        </div>
      );

    });

    return content;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <h4 className="App-link">React</h4>
        </header>

        <p>Server: <strong>{this.state.status}</strong></p>

        {this.renderBlock()}
      </div>
    );
  }
}

export default App;
