import * as trailer from '../src';
import * as path from 'path';

let logger = trailer.create();

logger.log('log message');
logger.debug('debug message');
logger.info('info message');
logger.warn('warn message');
logger.error('error message');
try {
    let p = {} as any as string;
    path.parse(p);
} catch (error) {
    logger.error(error);
}
logger.fatal('fatal message');
