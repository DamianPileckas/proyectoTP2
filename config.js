const currentEnv = process.env.ENV || 'dev'

const envs = {
    prod: {
        port: process.env.PROD_PORT,
        db: {
            client: process.env.PROD_DB_CLIENT,
            host: process.env.PROD_DB_HOST,
            name: process.env.PROD_DB_NAME,
            user: process.env.PROD_DB_USER,
            pass: process.env.PROD_DB_PASS
        }
    },
    dev: {
        port: process.env.DEV_PORT,
        db: {
            client: process.env.DEV_DB_CLIENT,
            host: process.env.DEV_DB_HOST,
            name: process.env.DEV_DB_NAME,
            user: process.env.DEV_DB_USER,
            pass: process.env.DEV_DB_PASS
        }
    }
}

const config = {
    port: envs[currentEnv].port,
    mode: process.env.MODO || 'db',
    db: envs[currentEnv].db,
    debugLevel: process.env.DEBUG_LEVEL || 5
}

export default config