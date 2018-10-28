import * as trailer from '../src';
import * as path from 'path';

let logger = trailer.create();

logger.log('user\'s log message');
logger.debug('user\'s debug message');
logger.info('user\'s info message');
logger.warn('user\'s warn message');
logger.error('user\'s error message');
try {
    let p = {} as any as string;
    path.parse(p);
} catch (error) {
    logger.error(error, 'user\'s error message');
}
logger.fatal('user\'s fatal message');


logger.setLevel('info');
logger.debug('user\'s debug message');
logger.info('user\'s info message');
