import notFound       from './not-found';
import sequelizeError from './sequelize-error';
import serverError    from './server-error';

export default (config = {}) => {
    config.env = config.env || process.env.NODE_ENV || 'production';

    return [
        notFound(config),
        sequelizeError(config),
        serverError(config)
    ];
};
