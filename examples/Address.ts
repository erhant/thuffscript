import {Label, Macro, compile} from '../src';

const addressMatchLabel = new Label('addresses_match');

const mask_address = new Macro('MASK_ADDRESS', {takes: 1, returns: 1}).body(
  0x000000000000000000000000ffffffffffffffffffffffffffffffffffffffffn,
  'and'
);

const requireAddr = new Macro('REQUIRE_ADDR', {takes: 1}).body(
  ['dup1', mask_address.call({})],
  [],
  ['eq', addressMatchLabel.src, 'jumpi'],
  [0x00, 'dup1', 'revert'],
  addressMatchLabel.dest
);

const code = compile(requireAddr, {
  title: 'Address',
  authors: ['Jet <https://github.com/JetJadeja>'],
  comments: [
    'Macros associated with addresses',
    'https://github.com/huff-language/huffmate/blob/main/src/utils/Address.huff',
  ],
  license: 'MIT',
});
await Bun.write('./examples/Address.huff', code);
