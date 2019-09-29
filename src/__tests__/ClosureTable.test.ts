import ClosureTable from '../index';
import { ITreeNode } from '../types';

interface Dummy {
  id: number;
}

const dummy1: Dummy = { id: 1 };
const dummy2: Dummy = { id: 2 };
const dummy3: Dummy = { id: 3 };
const dummy4: Dummy = { id: 4 };
const dummy5: Dummy = { id: 5 };
const dummy6: Dummy = { id: 6 };

/*
 * 1 -+- 2
 *    |
 *    +- 3 -+- 4
 *          |
 *          +- 5 --- 6
 */

const dummyTree: ITreeNode<Dummy> = {
  value: dummy1,
  children: [
    { value: dummy2 },
    {
      value: dummy3,
      children: [
        { value: dummy4 },
        {
          value: dummy5,
          children: [{ value: dummy6 }],
        },
      ],
    },
  ],
};

test('new ClosureTable()', () => {
  const valueIsObject = new ClosureTable(dummyTree);

  expect(valueIsObject.hierarchies).toEqual([
    { ancestor: dummy1, descendant: dummy1, generation: 0 },
    { ancestor: dummy1, descendant: dummy2, generation: 1 },
    { ancestor: dummy1, descendant: dummy3, generation: 1 },
    { ancestor: dummy1, descendant: dummy4, generation: 2 },
    { ancestor: dummy1, descendant: dummy5, generation: 2 },
    { ancestor: dummy1, descendant: dummy6, generation: 3 },
    { ancestor: dummy2, descendant: dummy2, generation: 0 },
    { ancestor: dummy3, descendant: dummy3, generation: 0 },
    { ancestor: dummy3, descendant: dummy4, generation: 1 },
    { ancestor: dummy3, descendant: dummy5, generation: 1 },
    { ancestor: dummy3, descendant: dummy6, generation: 2 },
    { ancestor: dummy4, descendant: dummy4, generation: 0 },
    { ancestor: dummy5, descendant: dummy5, generation: 0 },
    { ancestor: dummy5, descendant: dummy6, generation: 1 },
    { ancestor: dummy6, descendant: dummy6, generation: 0 },
  ]);

  const numberTree: ITreeNode<number> = {
    value: 111,
    children: [{ value: 222 }],
  };
  const valueIsNumber = new ClosureTable(numberTree);

  expect(valueIsNumber.hierarchies).toEqual([
    { ancestor: 111, descendant: 111, generation: 0 },
    { ancestor: 111, descendant: 222, generation: 1 },
    { ancestor: 222, descendant: 222, generation: 0 },
  ]);
});

test('findAncestorsOf', () => {
  const ct = new ClosureTable(dummyTree);

  expect(ct.findAncestorsOf(dummy5)).toEqual([dummy3, dummy1]);
  expect(ct.findAncestorsOf(dummy5, true)).toEqual([dummy5, dummy3, dummy1]);
});

test('findDescendantsOf', () => {
  const ct = new ClosureTable(dummyTree);

  expect(ct.findDescendantsOf(dummy3)).toEqual([dummy4, dummy5, dummy6]);
  expect(ct.findDescendantsOf(dummy3, true)).toEqual([dummy3, dummy4, dummy5, dummy6]);
});

test('findChildrenOf', () => {
  const ct = new ClosureTable(dummyTree);

  expect(ct.findChildrenOf(dummy2)).toEqual([]);
  expect(ct.findChildrenOf(dummy3)).toEqual([dummy4, dummy5]);
});

test('setEqualFunc', () => {
  const ct = new ClosureTable(dummyTree);

  expect(ct.findDescendantsOf({ id: 3 })).toEqual([]);
  ct.setEqualFunc((s: Dummy, t: Dummy): boolean => s.id === t.id);
  expect(ct.findDescendantsOf({ id: 3 })).toEqual([dummy4, dummy5, dummy6]);
});
