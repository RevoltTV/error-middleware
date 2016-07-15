import _ from 'lodash';
import {
    BadRequestError,
    ConflictError
} from '@revolttv/errors';
import {
    UniqueConstraintError,
    ValidationError
} from 'sequelize';

export default () => {
    return (err, req, res, next) => {
        if (err instanceof ValidationError) {
            let message = `${err.message}: ${_.map(err.errors, 'message').join(', ')}`;
            let fields = _.map(err.errors, 'path');

            if (err instanceof UniqueConstraintError) {
                return next(new ConflictError(message, fields));
            }

            return next(new BadRequestError(message, fields));
        }

        return next(err);
    };
};
