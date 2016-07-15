import { expect } from 'chai';

import stack from '../src';

describe('index', () => {
    it('should be a function', () => {
        expect(stack).to.be.a('function');
    });

    it('should return 3 items in stack', () => {
        let middleware = stack();
        expect(middleware.length).to.equal(3);
    });

    it('should set config env property to NODE_ENV', () => {
        let config = {};
        stack(config);

        expect(config.env).to.equal(process.env.NODE_ENV);
    });
});
