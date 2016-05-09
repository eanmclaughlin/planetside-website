export function initialize( application ) {
  application.register('io:main', window.io, {instantiate: false});
  application.inject('service:planetsidesocket', 'io', 'io:main');
  application.inject('component', 'ps2socket', 'service:planetsidesocket');
}

export default {
  name: 'websocket-init',
  initialize
};
