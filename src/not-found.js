import { NotFoundError } from '@revolttv/errors';

export default () => {
    function notFoundHandler(req, res, next) {
        return next(new NotFoundError(`${req.path} is not a valid route`));
    }

    return notFoundHandler;
};
