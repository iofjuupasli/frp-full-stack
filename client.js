import most from 'most';
import socket from 'most-socket-client';

const ioPath = 'http://localhost:3000'

const $ = v => document.querySelectorAll(v);
const $1 = v => document.querySelector(v);

const plusElem = $1('#plus');
const minusElem = $1('#minus');
const resultElem = $1('#result');

const changes = most.merge(
    most.fromEvent('click', plusElem).constant(1),
    most.fromEvent('click', minusElem).constant(-1)
);

socket.output(ioPath + '/', 'change')(changes);

socket.input(ioPath + '/', 'value')
    .observe(v => resultElem.textContent = v);
