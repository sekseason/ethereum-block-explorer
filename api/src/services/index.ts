import { Application } from '../declarations';

import ETH from './ethereum';

import users from './users/users.service';
import blocks from './blocks/blocks.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(users);
  app.configure(blocks);

  const eth = new ETH(app);

  eth.subscribe();
}
