import {CodeTable, Constant, ErrorABI, EventABI, FreeStoragePointer, FunctionABI, JumpTable, PackedJumpTable} from '.';

export type Declaration = {
  type: 'function' | 'constant' | 'error' | 'event' | 'table';
  decl: string;
  name: string;
};

export type Declarables =
  | FunctionABI
  | Constant
  | FreeStoragePointer
  | ErrorABI
  | EventABI
  | CodeTable
  | JumpTable
  | PackedJumpTable;
