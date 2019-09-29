# closure-table [![Build Status](https://travis-ci.org/ak10m/js-closure-table.svg?branch=master)](https://travis-ci.org/ak10m/js-closure-table)

> Closure Table on javascript

## Install

```sh
npm install closure-table
```

## Usage

```typescript
import ClosureTable, { ITreeNode } from 'closure-table';

// sample node

interface Sample {
  id: number;
}

const n1: Sample = { id: 1 };
const n2: Sample = { id: 2 };
const n3: Sample = { id: 3 };
const n4: Sample = { id: 4 };
const n5: Sample = { id: 5 };
const n6: Sample = { id: 6 };
const n7: Sample = { id: 7 };

// sample tree
//
//  n1 -+- n2 --- n4
//      |
//      +- n3 -+- n5
//             |
//             +- n6 --- n7

const tree: ITreeNode<Sample> = {
  value: n1,
  children: [
    {
      value: n2,
      children: [{ value: n4 }],
    },
    {
      value: n3,
      children: [
        { value: n5 },
        { value: n6, children: [{ value: n7 }] },
      ],
    },
  ],
};

// initialize
const ct = new ClosureTable(tree);

// function examples

ct.findAncestorsOf(n3);         // [ { id: 1 } ]
ct.findAncestorsOf(n3, true);   // [ { id: 3 }, { id: 1 } ]
ct.findDescendantsOf(n3);       // [ { id: 5 }, { id: 6 }, { id: 7 } ]
ct.findDescendantsOf(n3, true); // [ { id: 3 }, { id: 5 }, { id: 6 }, { id: 7 } ]
ct.findChildrenOf(n3);          // [ { id: 5 }, { id: 6 } ]

// default equal function:
//
//   function(source: T, target: T): boolean {
//     return source === target;
//   }

ct.findDescendantsOf({ id: 3 }); // []

// modify equal function

ct.setEqualFunc((s: Sample, t: Sample): boolean => s.id === t.id);

ct.findDescendantsOf({ id: 3 }); // [ { id: 5 }, { id: 6 }, { id: 7 } ]
```

## Run tests

```sh
npm run test
```

## Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/ak10m/js-closure-table/issues).

## License

Copyright © 2019 [ak10m <akio.morimoto@airits.jp>](https://github.com/ak10m).<br />
This project is [MIT](https://github.com/ak10m/js-closure-table/blob/master/LICENSE) licensed.
