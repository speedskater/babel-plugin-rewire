import React from 'react';

const Outer = ({children}) => <div>{children}</div>;
const Inner = () => <div/>;

export default () => (
  <Outer>
    <Inner/>
  </Outer>
)
