import chai, { expect } from 'chai';
import sinon            from 'sinon';
import sinonChai        from 'sinon-chai';
import {
    UniqueConstraintError,
    ValidationError
} from 'sequelize';

import { BadRequestError, ConflictError } from '@revolttv/errors';

import sequelizeError from '../src/sequelize-error';

chai.use(sinonChai);

describe('sequelize-error', () => {
    it('should expose function name for middleware', () => {
        let middleware = sequelizeError();

        expect(middleware.name).to.equal('sequelizeErrorHandler');
    });

    it('should call next() with ConflictError if it encounters a UniqueConstraintError', () => {
        let next = sinon.spy();

        let err = new UniqueConstraintError();
        let middleware = sequelizeError();

        middleware(err, {}, {}, next);

        expect(next).to.have.been.calledOnce;
        expect(next.firstCall.args[0]).to.be.an.instanceof(ConflictError);
    });

    it('should next() with BadRequestError if it encounters a ValidationError', () => {
        let next = sinon.spy();

        let err = new ValidationError();
        let middleware = sequelizeError();

        middleware(err, {}, {}, next);

        expect(next).to.have.been.calledOnce;
        expect(next.firstCall.args[0]).to.be.an.instanceof(BadRequestError);
    });

    it('should pass on to next if not a ValidationError', () => {
        let next = sinon.spy();
        let err = new Error();

        let middleware = sequelizeError();

        middleware(err, {}, {}, next);

        expect(next).to.have.been.calledOnce.and.calledWith(err);
    });
});
