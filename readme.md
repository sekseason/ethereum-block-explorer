# Ethereum Block Explorer

The Demo of real-time private Ethereum Block Explorer.

API:
1. FeatherJs (https://feathersjs.com/)
2. KnexJs (http://knexjs.org/)
3. Objection.js (https://vincit.github.io/objection.js/)

WEB:
1. Reactjs (https://reactjs.org/)
2. FeatherJs Client (https://docs.feathersjs.com/api/client.html#load-with-a-module-loader)
3. Socket.io Client (https://socket.io/docs/client-api/)

Video:

https://www.loom.com/share/2abb18b5cb2845d19618ff551cb09d33

## Installation

API:
```
cd api
yarn

# configure mysql connection and Ethereum RPC at `config/default.json`

...
"mysql": {
    "client": "mysql2",
    "connection": "mysql://user:password@localhost:3306/db_name"
  },
  "ethereum": {
    "rpc": "ws://host:port"
  }
...

```

WEB:
```
cd web
yarn
```

## Run
```
API:
# open new terminal
cd api
yarn start or yarn dev (hot reload)

WEB:
# open new terminal
cd web
yarn start
```

Default api is running on http://localhost:3030
Default web is running on http://localhost:3000
