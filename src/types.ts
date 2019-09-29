export interface ITreeNode<T> {
  value: T;
  children?: Array<ITreeNode<T>>;
}

export interface IHierarchy<T> {
  ancestor: T;
  descendant: T;
  generation: number;
}

export type EqualFunc<T> = (source: T, target: T) => boolean;
