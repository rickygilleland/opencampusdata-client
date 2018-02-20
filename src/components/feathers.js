import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import authentication from '@feathersjs/authentication-client';

const restClient = rest('http://localhost:3030');
const client = feathers();


client.configure(restClient.fetch(window.fetch));

export default client;