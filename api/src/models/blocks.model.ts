// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import { Model } from 'objection';
import Knex from 'knex';
import { Application } from '../declarations';

class blocks extends Model {
  createdAt!: string;
  updatedAt!: string;

  static get tableName() {
    return 'blocks';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['hash'],

      properties: {
        author: { type: ['string', 'null'] },
        difficulty: { type: ['string', 'null'] },
        extraData: { type: ['string', 'null'] },
        gasLimit: { type: ['number'] },
        gasUsed: { type: ['number'] },
        hash: { type: ['string', 'null'] },
        logsBloom: { type: ['string', 'null'] },
        miner: { type: ['string', 'null'] },
        number: { type: ['number',] },
        parentHash: { type: ['string', 'null'] },
        receiptsRoot: { type: ['string', 'null'] },
        sealFields: { type: ['string', 'null'] },
        signature: { type: ['string', 'null'] },
        size: { type: ['number'] },
        stateRoot: { type: ['string', 'null'] },
        step: { type: ['string', 'null'] },
        timestamp: { type: ['number'] },
        transactionsRoot: { type: ['string', 'null'] },
      }
    };
  }

  $beforeInsert() {
    this.createdAt = this.updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');;
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');;
  }
}

export default function (app: Application) {
  const db: Knex = app.get('knex');

  db.schema.hasTable('blocks').then(exists => {
    if (!exists) {
      db.schema.createTable('blocks', table => {
        table.increments('id');

        table.string('author').nullable();
        table.string('difficulty').nullable();
        table.string('extraData').nullable();
        table.integer('gasLimit').unsigned().defaultTo(0);
        table.integer('gasUsed').unsigned().defaultTo(0);
        table.string('hash').nullable();
        table.text('logsBloom').nullable();
        table.string('miner').nullable();
        table.integer('number').unsigned().defaultTo(0);
        table.string('parentHash').nullable();
        table.string('receiptsRoot').nullable();
        table.json('sealFields').nullable();
        table.string('sha3Uncles').nullable();
        table.string('signature').nullable();
        table.integer('size').unsigned().defaultTo(0);
        table.string('stateRoot').nullable();
        table.string('step').nullable();
        table.integer('timestamp').unsigned().defaultTo(0);
        table.string('transactionsRoot').nullable();

        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created blocks table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating blocks table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating blocks table', e)); // eslint-disable-line no-console

  return blocks;
}
