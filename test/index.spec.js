import Index from '../src/index';

describe('index', () => {
  it('exports expected modules', () => {
    expect(Index).to.have.property('SlackMessageDispatcher');
    expect(Index).to.have.property('SlackMessageListerner');
  });
})