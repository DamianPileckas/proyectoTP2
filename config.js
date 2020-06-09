const currentEnv = process.env.ENV || 'dev'

const envs = {
    prod: {
        port: process.env.PROD_PORT,
        mode: process.env.PROD_MODE,
        db: {
            client: process.env.PROD_DB_CLIENT,
            name: process.env.PROD_DB_NAME,
            cnxStr: process.env.PROD_DB_CNX_STR
        }
    },
    dev: {
        port: process.env.DEV_PORT,
        mode: process.env.DEV_MODE,
        db: {
            client: process.env.DEV_DB_CLIENT,
            dbPath: process.env.DEV_DB_PATH
        }
    }
}

const config = {
    port: envs[currentEnv].port,
    mode: envs[currentEnv].mode,
    db: envs[currentEnv].db,
    debugLevel: process.env.DEBUG_LEVEL || 5
}

export default config