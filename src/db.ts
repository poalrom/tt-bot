import { ConnectionOptions, createConnection, Connection } from "typeorm";

export let db: Connection;

const ormConfig: ConnectionOptions = require('../ormconfig');

export function initDB() {
    return createConnection(ormConfig)
        .then((connection) => db = connection);
}