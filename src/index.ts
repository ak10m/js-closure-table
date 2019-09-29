import { EqualFunc, IHierarchy, ITreeNode } from './types';

export default class ClosureTable<T> {
  public readonly hierarchies: Array<IHierarchy<T>>;

  constructor(tree: ITreeNode<T>) {
    this.hierarchies = this.hierarchize(tree);
  }

  public setEqualFunc(fn: EqualFunc<T>): void {
    this.equal = fn;
  }

  public findAncestorsOf(value: T, withSelf?: boolean): T[] {
    return this.hierarchies
      .filter((h: IHierarchy<T>) => (!!withSelf || h.generation > 0) && this.equal(h.descendant, value))
      .sort((a: IHierarchy<T>, b: IHierarchy<T>) => a.generation - b.generation)
      .map((h: IHierarchy<T>) => h.ancestor);
  }

  public findDescendantsOf(value: T, withSelf?: boolean): T[] {
    return this.hierarchies
      .filter((h: IHierarchy<T>) => (!!withSelf || h.generation > 0) && this.equal(h.ancestor, value))
      .sort((a: IHierarchy<T>, b: IHierarchy<T>) => a.generation - b.generation)
      .map((h: IHierarchy<T>) => h.descendant);
  }

  public findChildrenOf(value: T): T[] {
    return this.hierarchies
      .filter((h: IHierarchy<T>) => h.generation === 1 && this.equal(h.ancestor, value))
      .sort((a: IHierarchy<T>, b: IHierarchy<T>) => a.generation - b.generation)
      .map((h: IHierarchy<T>) => h.descendant);
  }

  private equal: EqualFunc<T> = (source: T, target: T): boolean => source === target;

  private hierarchize(root: ITreeNode<T>): Array<IHierarchy<T>> {
    return [
      ...this.buildGenerations(root, root, 0),
      ...(root.children || []).reduce(
        (r: Array<IHierarchy<T>>, child: ITreeNode<T>) => r.concat(this.hierarchize(child)),
        [],
      ),
    ];
  }

  private buildGenerations(source: ITreeNode<T>, target: ITreeNode<T>, generation: number): Array<IHierarchy<T>> {
    return [
      {
        ancestor: source.value,
        descendant: target.value,
        generation,
      },
      ...(target.children || []).reduce(
        (r: Array<IHierarchy<T>>, child: ITreeNode<T>) =>
          r.concat(this.buildGenerations(source, child, generation + 1)),
        [],
      ),
    ];
  }
}

export { EqualFunc, ITreeNode, IHierarchy } from './types';
