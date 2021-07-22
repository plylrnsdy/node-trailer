import { createLogger } from "@/index"


const logger = createLogger({ logFile: `${__dirname}/index.log` })

logger.log('test')
logger.debug('test')
logger.info('test')
logger.warn('test')
logger.error('test')
logger.error('error', new Error('User Error'))
logger.fatal('test')
