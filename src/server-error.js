import _      from 'lodash';
import logger from 'winston';

export default (config = {}) => {
    return (err, req, res, next) => { // eslint-disable-line no-unused-vars
        logger[err.level || 'error'](err);

        let error = {
            error: true,
            message: err.message || 'Internal Server Error'
        };

        if (_.size(err.fields) > 0) {
            error.fields = err.fields;
        }

        if (config.env !== 'production') {
            error.stack = err.stack;
        }

        return res.status(err.status || 500).json(error);
    };
};
