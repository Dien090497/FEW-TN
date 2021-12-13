const test = {
  env: 'test',
  xmppServer: 'http://localhost:4444',
  rootDomain: 'http://localhost:4444',
};

const staging = {
  env: 'staging',
  xmppServer: 'mykid.ttc.software:5443',
  rootDomain: 'mykid.ttc.software',
};

const product = {
  env: 'product',
  xmppServer: 'https://beaeshop.herokuapp.com',
  rootDomain: 'https://beaeshop.herokuapp.com',
};

export const RETRY_HTTP_REQUEST_NUMBER = 0;
export default {
  maxThumbnailSize: 160,
  product,
  staging,
  test,
};
