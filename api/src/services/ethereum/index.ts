import { Application } from '../../declarations';
import app from '../../app';

const Eth = require('web3-eth');

export default class ETH {
  private url: string;

  constructor(private app: Application) {
    this.url = app.get('ethereum')['rpc'];
  }

  subscribe() {
    const web3 = new Eth(this.url);

    if (web3) {
      console.log(`RPC connected ${this.url}`);

      const sub = web3.subscribe('newBlockHeaders', (err: any, res: any) => {
        if (err) {
          console.log('Error: ', err);
        }

        this.store(res);
      });

      process.on('SIGINT', () => {
        setTimeout(() => {
          sub.unsubscribe((err: any, res: any) => {
            if (err) {
              console.log('Error: ', err);
            }

            if (res) {
              console.log('RPC disconnected.');
              process.exit(0);
            }
          });
        }, 100);
      });
    }
  }

  async store(block: any) {
    if (block && block.hash) {
      const blocks = this.app.service('blocks');

      console.log(`new Block #${block.hash}`);

      block.sealFields = JSON.stringify(block.sealFields);

      try {
        await blocks
          .create(block)
          .then((block: any) => {
            console.log(`saved #${block.id}`)
          });
      } catch (err) {
        console.log('save failed: ', err.message || err);
      }
    }
  }
}