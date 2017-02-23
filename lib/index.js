const http = require('https');

function firstUpperCase(word) {
  return word[0].toUpperCase() + word.slice(1, word.length);
}

function firstLowerCase(word) {
  return word[0].toLowerCase() + word.slice(1, word.length);
}

function transform(response) {
  var newResponse = {};
  for (var k in response) {
    var key = k.split('_');
    var newKey = firstLowerCase(key.reduce((acc, x) => acc + firstUpperCase(x), ''));
    newResponse[newKey] = response[k];
  }
  return Object.assign({}, {
    bin: newResponse.bin,
    brand: newResponse.brand,
    countryCode: newResponse.countryCode,
    bank: newResponse.issuer,
    isPrepaid: newResponse.isPrepaid,
  });
}

function request(bin, callback) {
  http.get({
    port: 443,
    host: 'bins.payout.com',
    path: '/api/v1/bins/' + bin,
    method: 'GET',
  }, (response) => {
    var body = '';

    response.on('data', (d) => {
      body += d;
    });

    response.on('error', (err) => {
      callback(err);
    });

    response.on('end', () => {
      try {
        const parsed = JSON.parse(body);

        callback(null, transform(parsed));
      } catch(e) {
        callback(e);
      }
    });
  });
}

function getBin(bin, callback) {
  if (callback) {
    request(bin, callback);
    return;
  }

  return new Promise((resolve, reject) => {
    request(bin, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    })
  });
}

module.exports = getBin;
