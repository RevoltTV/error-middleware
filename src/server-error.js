import _      from 'lodash';
import logger from 'winston';

export default (config = {}) => {
    function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
        logger[err.level || 'error'](err);

        let error = {
            error: true,
            message: err.message || 'Internal Server Error'
        };

        if (_.size(err.fields)) {
            error.fields = err.fields;
        }

        if (_.size(err.details)) {
            error.details = err.details;
        }

        if (config.env !== 'production') {
            error.stack = err.stack;
        }

        let status = err.status || 500;
        if (err instanceof TypeError) {
            status = 400;
        }

        return res.status(status).json(error);
    }

    return errorHandler;
};
