import { NotFoundError } from '@revolttv/errors';

export default () => {
    return (req, res, next) => {
        return next(new NotFoundError(`${req.path} is not a valid route`));
    };
};
