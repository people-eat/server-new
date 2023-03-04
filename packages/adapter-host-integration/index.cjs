// https://talk.plesk.com/threads/nodejs-does-not-work-with-type-module.367205/

/* eslint-disable no-undef */
import('./dist/index.js')
    .then(() => console.log('started'))
    .catch((error) => console.error(error));
