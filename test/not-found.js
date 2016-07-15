import chai, { expect } from 'chai';
import sinon            from 'sinon';
import sinonChai        from 'sinon-chai';

import { NotFoundError } from '@revolttv/errors';

import notFound from '../src/not-found';

chai.use(sinonChai);

describe('not-found', () => {
    it('should call next() with NotFoundError if the route is not found', () => {
        let next = sinon.spy();
        let middleware = notFound();

        middleware({ path: '/test' }, {}, next);

        expect(next).to.have.been.calledOnce;
        expect(next.firstCall.args[0]).to.be.an.instanceof(NotFoundError);
    });
});
