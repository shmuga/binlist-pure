# Binlist :credit_card: [![Build Status](https://travis-ci.org/shmuga/binlist-pure.svg?branch=master)](https://travis-ci.org/shmuga/binlist-pure)

[![Greenkeeper badge](https://badges.greenkeeper.io/shmuga/binlist-pure.svg)](https://greenkeeper.io/)
Binlist wrapper for bins.payout.com with zero dependecies and Promise flavor.

# DEPRECATED: use https://github.com/paylike/binlookup instead.

**Install with**:  `npm install --save binlist-pure`
# Usage
There are two ways of usage:
```javascript
// Promise-based
const bin = require('binlist-pure');
bin('411111').then(console.log);

// or callback-based
bin('411111', (err, res) => {console.log(res)})
```

### What is binlist
The first 6 digits of a credit card number are known as the Issuer Identification Number (IIN), previously known as Bank Identification Number (BIN). These identify the institution that issued the card to the card holder.

This webservice has an internal database with IIN/BIN information, which is queried via the Rest API. There's no magic or tricky calculations, it's just a database. And although the database is very accurate, don't expect it to be perfect.
