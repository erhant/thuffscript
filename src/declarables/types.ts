import type {Constant, ErrorABI, EventABI, FreeStoragePointer, FunctionABI, Table} from '.';

export type Declaration = {
  type: 'function' | 'constant' | 'error' | 'event' | 'table';
  decl: string;
  name: string;
};

export type Declarables = FunctionABI | Constant | FreeStoragePointer | ErrorABI | EventABI | Table;
