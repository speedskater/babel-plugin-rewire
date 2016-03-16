import DivInsideDiv from './src/default-export';
import ReactDOMServer from 'react-dom/server';
import expect from 'expect.js';

describe('React stateless arrow functions', () => {
  it('should work', () => {
    const result = ReactDOMServer.renderToStaticMarkup(<DivInsideDiv />);
    expect(result).to.be('<div><div></div></div>');
  });
});
