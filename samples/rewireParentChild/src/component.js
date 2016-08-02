import React from 'react'
import ChildComponent from './child-component';
import ParentComponent from './parent-component';

const Component = () => <ParentComponent><ChildComponent/></ParentComponent>;

export default Component;
