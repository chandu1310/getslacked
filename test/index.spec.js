import { demo } from '../src/index';

describe('index', () => {
  it('returns welcome message when called', () => {
    expect(demo()).to.equal('Welcome. This project was build with nodeneeds');
  });
})