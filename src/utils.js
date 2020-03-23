function genCharArray(charA, charZ) {
  const a = []; let i = charA.charCodeAt(0); const
    j = charZ.charCodeAt(0);
  for (; i <= j; i += 1) {
    a.push(String.fromCharCode(i));
  }
  return a;
}

const parseJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64)
    .split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));

  return JSON.parse(jsonPayload);
};

const post = (baseUrl) => async (url, data, token) => {
  try {
    const resp = await fetch(new URL(url, baseUrl).href, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      body: JSON.stringify(data),
    });
    return resp.json();
  } catch (e) {
    return {
      error: true,
      message: e,
    };
  }
};

const get = (baseUrl) => async (url, token) => {
  try {
    const resp = await fetch(new URL(url, baseUrl).href, {
      method: 'GET',
      headers: {
        token,
      },
    });
    return resp.json();
  } catch (e) {
    return {
      error: true,
      message: e,
    };
  }
};
module.exports = {
  genCharArray,
  parseJwt,
  get,
  post,
};
