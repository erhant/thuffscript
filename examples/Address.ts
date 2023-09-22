import {Label, Macro, Program} from '../src';

const addressMatchLabel = new Label('addresses_match');

const MASK_ADDRESS = new Macro('MASK_ADDRESS', {takes: 1, returns: 1}).body(
  0x000000000000000000000000ffffffffffffffffffffffffffffffffffffffffn,
  'and'
);

const REQUIRE_ADD = new Macro('REQUIRE_ADDR', {takes: 1}).body(
  ['dup1', MASK_ADDRESS.call({})],
  [],
  ['eq', addressMatchLabel.src, 'jumpi'],
  [0x00, 'dup1', 'revert'],
  addressMatchLabel.dest
);

new Program(REQUIRE_ADD)
  .compile({
    title: 'Address',
    authors: ['Jet <https://github.com/JetJadeja>'],
    comments: [
      'Macros associated with addresses',
      'https://github.com/huff-language/huffmate/blob/main/src/utils/Address.huff',
    ],
    license: 'MIT',
  })
  .export('./examples/Address.huff');
