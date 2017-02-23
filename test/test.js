const assert = require('assert');
const bin = require('./../lib/index');

function checkFields(res) {
  assert(res.bin !== undefined, 'No bin');
  assert(res.brand !== undefined, 'No brand');
  assert(res.countryCode !== undefined, 'No country code');
  assert(res.bank !== undefined, 'No bank');
  assert(res.isPrepaid !== undefined, 'No prepaid information');
}

describe('common test', () => {
  it('should test promises', () => {
    return bin('411111').then(
      res => checkFields(res),
      err => assert(false, 'Error during request')
    );
  });

  it('should test cb', (done) => {
    bin('555555', (err, res) => {
      assert(err === null, 'Error during request');
      checkFields(res);
      done();
    });
  });
});
