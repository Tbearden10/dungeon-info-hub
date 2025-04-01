import { BungieHttpProtocol } from 'bungie-net-core';
import { getProfile } from 'bungie-net-core/endpoints/Destiny2';

const bungiePlatformHttp: BungieHttpProtocol = async config => {
  const headers = new Headers({
    'X-API-KEY': process.env.BUNGIE_API_KEY!
  });

  let body;
  if (config.contentType === 'application/json') {
    headers.set('Content-Type', config.contentType);
    body = JSON.stringify(config.body);
  }

  // implement how you like
  // headers.set('Authorization', `Bearer ${access_token}`);

  const url = config.baseUrl + (config.searchParams ? '?' + config.searchParams.toString() : '');

  const payload = {
    method: config.method,
    body,
    headers
  };

  const res = await fetch(url, payload);
  if (!res.ok) {
    // Your choice here
    throw new Error(res.statusText);
  }

  if (res.headers.get('Content-Type')?.includes('application/json')) {
    return await res.json();
  } else {
    // Your choice here
    throw new Error('Response was not JSON');
  }
};

getProfile(bungiePlatformHttp, {
  components: ['CharacterInventories'],
  destinyMembershipId: '4611686018445361531',
  membershipType: 1
});