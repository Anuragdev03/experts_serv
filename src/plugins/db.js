import pg from "pg";
const { Pool } = pg
import { envVar } from "../utils/constants.js";

export const qb = new Pool({
    user: envVar.pgUser,
    host: envVar.pgHost,
    database: envVar.pgdb,
    password: envVar.pgPassword,
    port: envVar.pgPort,
    max: 20,
    min: 5,
    idleTimeoutMillis: 30000
});

export const query = async (text, params) => {
    // const start = Date.now()
    const res = await qb.query(text, params)
    // const duration = Date.now() - start
    // console.log('executed query', { text, duration, rows: res.rowCount })
    return res
  }

