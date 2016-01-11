import React from 'react'
import MessageList from './ChildComponent.js';

export function another() { return <MessageList/> };

export default () => <MessageList/>;