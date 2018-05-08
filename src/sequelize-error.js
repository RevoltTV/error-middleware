import _ from 'lodash';
import { BadRequestError, ConflictError } from '@revolttv/errors';

export default () => {
    function sequelizeErrorHandler(err, req, res, next) {
        try {
            const { UniqueConstraintError, ValidationError } = require('sequelize');
            if (err instanceof ValidationError) {
                let message = `${err.message}: ${_.map(err.errors, 'message').join(', ')}`;
                let fields = _.map(err.errors, 'path');

                if (err instanceof UniqueConstraintError) {
                    return next(new ConflictError(message, fields));
                }

                return next(new BadRequestError(message, fields));
            }

            return next(err);
        } catch (requireError) {
            return next(err);
        }
    }

    return sequelizeErrorHandler;
};
