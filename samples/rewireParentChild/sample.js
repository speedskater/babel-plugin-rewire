import React from 'react';
import ReactDOMServer from 'react-dom/server'
import expect from 'expect.js';
import Component from './src/component.js';

describe('Rewire parent and child components', () => {
  it('Should be able to rewire parent and child components.', () => {
    const RewiredChildComponent = () => <div className="rewired-child"/>;
    const RewiredParentComponent = ({ children }) =>
      <div className="rewired-parent">{ children }</div>;

    Component.__Rewire__('ChildComponent', RewiredChildComponent);
    Component.__Rewire__('ParentComponent', RewiredParentComponent);

    const result = ReactDOMServer.renderToStaticMarkup(<Component/>);

    expect(result).to.be(
      '<div class="rewired-parent"><div class="rewired-child"></div></div>'
    );
  });
});
