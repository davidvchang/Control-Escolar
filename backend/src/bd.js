import pkg from 'pg';
import dotenv from "dotenv";

dotenv.config()

const { Pool } = pkg;

const conectionString = process.env.POSTGRESQL_URI

export const pool = new Pool({
    connectionString: conectionString
})

export const openConnection = async () => {

    try {
        await pool.connect()
        console.log(`Base de datos conectada`)
    } catch (ex) {
        console.log(`Ha ocurrido un error: ${ex}`)
    }
}