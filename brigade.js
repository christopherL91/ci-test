'use strict';

const {events, Job} = require("brigadier")

events.on('push', (e, p) => {
    console.log({e, p});
    console.log('Got push from github');
});
