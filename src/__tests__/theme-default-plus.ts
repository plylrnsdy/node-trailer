import { createLogger, themes } from "@/index"


const logger = createLogger({ logFile: `${__dirname}/theme-default-plus.log` }, themes.defaultPlus())

logger.log('test')
logger.debug('test')
logger.info('test')
logger.warn('test')
logger.error('test')
logger.error('error', new Error('User Error'))
logger.fatal('test')
