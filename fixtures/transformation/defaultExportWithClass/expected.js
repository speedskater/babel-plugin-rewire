import fetch from 'isomorphic-fetch';

export default class EclipseClient {
    constructor() {
        if (process.env.NODE_ENV !== 'production') {
            this.apiUrl = 'http:///';
        } else {
            this.apiUrl = 'http:///';
        }
    }

}