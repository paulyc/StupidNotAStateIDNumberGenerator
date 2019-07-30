#!/usr/bin/env node
/*
 * generator.js
 * 
 * Copyright (C) 2019 Paul Ciarlo <paul.ciarlo@gmail.com>
 * 
 * See LICENSE file for terms of copyright use.
 */
'use strict';

//  29A 10 bits
//   63  7 bits
// 270F 14 bits
// tot. 31 bits
// xxx xxxx xxxy yyyy yyzz zzzz zzzz zzzz
// max:
// 101 0011 0101 0011 1000 0111 1110 0011
// 5   3    5    3    8    7    E    3
// x mask:
// 111 1111 1110 0000 0000 0000 0000 0000
// 7   F    E    0    0    0    0    0
// y mask:
// 000 0000 0001 1111 1100 0000 0000 0000
// 0   0    1    F    A    0    0    0
// z mask:
// 000 0000 0000 0000 0011 1111 1111 1111
// 0   0    0    0    3    F    F    F
function isValid(num) {
  const the_beast = 0x29A;
  const x = (num & 0x7FE00000) >> 21;
  if (x < 0x0001 || x >= the_beast) {
    return false;
  }
  const y = (num & 0x001FA000) >> 14;
  if (y == 0 || y > 0x63) {
    return false;
  }
  const z = (num & 0x00003FFF);
  if (z == 0 || z >= 0x2710) {
    return false;
  }
  return true;
}

function* generate() {
  while (true) {
    const x = Math.floor(Math.random() * 0x535387E3);
    if (isValid(x)) yield(x);
  }
}

module.exports = generate;

function main() {
  for (const x of generate()) {
    console.log('Found this', new Number(x).toString(16), 'on the ground');
  }
}

function benchmark() {
  // TODO calculate avg. number of seconds to generate every possible stupid number
}

if (require.main === module) {
  main()
}
