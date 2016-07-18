import chai, { expect } from 'chai';
import logger           from 'winston';
import sinon            from 'sinon';
import sinonChai        from 'sinon-chai';

import serverError from '../src/server-error';

chai.use(sinonChai);

describe('not-found', () => {
    let res;

    before(() => {
        logger.remove(logger.transports.Console);
    });

    after(() => {
        logger.add(logger.transports.Console);
    });

    beforeEach(() => {
        res = {
            json: sinon.stub().returnsThis(),
            status: sinon.stub().returnsThis()
        };
    });

    it('should return a 500 on arbitrary error', () => {
        let err = new Error('test error');
        let middleware = serverError();

        middleware(err, {}, res, sinon.spy());

        expect(res.status).to.have.been.calledOnce.and.calledWith(500);
        expect(res.json).to.have.been.calledOnce;

        let error = res.json.firstCall.args[0];
        expect(error.error).to.equal(true);
        expect(error.message).to.equal(err.message);
        expect(error.stack).to.exist;
        expect(error.fields).to.not.exist;
    });

    it('should return a 400 on a TypeError', () => {
        let err = new TypeError('typeerror');
        let middleware = serverError();

        middleware(err, {}, res, sinon.spy());

        expect(res.status).to.have.been.calledWith(400);
    });

    it('should set response status if Error object contains status property', () => {
        let err = new Error('test error');
        err.status = 400;
        let middleware = serverError();

        middleware(err, {}, res, sinon.spy());

        expect(res.status).to.have.been.calledOnce.and.calledWith(400);
    });

    it('should send fields if Error object contains fields property', () => {
        let err = new Error('test error');
        err.fields = ['test', 'field'];
        let middleware = serverError();

        middleware(err, {}, res, sinon.spy());

        expect(res.json).to.have.been.calledOnce;
        expect(res.json.firstCall.args[0].fields).to.exist.and.to.deep.equal(['test', 'field']);
    });

    it('should hide error details when in production env', () => {
        let err = new Error('test error');
        let middleware = serverError({ env: 'production' });

        middleware(err, {}, res, sinon.spy());

        expect(res.status).to.have.been.calledOnce.and.calledWith(500);
        expect(res.json).to.have.been.calledOnce.and.calledWith({
            error: true,
            message: 'test error'
        });
    });
});
