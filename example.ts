import ClosureTable, { ITreeNode } from './lib';

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

console.log(`
// sample node

interface Sample {
  id: number;
}
`);
console.log('const n1: Sample =', n1);
console.log('const n2: Sample =', n2);
console.log('const n3: Sample =', n3);
console.log('const n4: Sample =', n4);
console.log('const n5: Sample =', n5);
console.log('const n6: Sample =', n6);
console.log('const n7: Sample =', n7);

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

const ct = new ClosureTable<Sample>(tree);

console.log(`
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
`);

console.log('ct.findAncestorsOf(n3);         //', ct.findAncestorsOf(n3));
console.log('ct.findAncestorsOf(n3, true);   //', ct.findAncestorsOf(n3, true));
console.log('ct.findDescendantsOf(n3);       //', ct.findDescendantsOf(n3));
console.log('ct.findDescendantsOf(n3, true); //', ct.findDescendantsOf(n3, true));
console.log('ct.findChildrenOf(n3);          //', ct.findChildrenOf(n3));

console.log(`
// default equal function:
//
//   function(source: T, target: T): boolean {
//     return source === target;
//   }
`);

console.log('ct.findDescendantsOf({ id: 3 }); //', ct.findDescendantsOf({ id: 3 }));
console.log(`
// modify equal function

ct.setEqualFunc((s: Sample, t: Sample): boolean => s.id === t.id);
`);
ct.setEqualFunc((s: Sample, t: Sample): boolean => s.id === t.id);
console.log('ct.findDescendantsOf({ id: 3 }); //', ct.findDescendantsOf({ id: 3 }));
