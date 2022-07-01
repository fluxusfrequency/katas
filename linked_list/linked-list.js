import { List, Element } from './simple-linked-list';

const expect = (actual) => ({
  toEqual: expected => actual === expected ? console.log('passed') : console.log('failed)
});

const element = new Element(1);
expect(element.value).toEqual(1);

// const element = new Element(2);
// expect(element.value).toEqual(2);
// const element = new Element(1);
// expect(element.next).toEqual(null);
// const list = new List();
// expect(list).toBeDefined();
// const list = new List();
// expect(list.length).toEqual(0);
// const list = new List();
// const element = new Element(1);
// expect(() => list.add(element)).not.toThrow();
// const list = new List();
// const element = new Element(1);
// list.add(element);
// expect(list.length).toEqual(1);
// const list = new List();
// const element1 = new Element(1);
// const element2 = new Element(3);
// list.add(element1);
// list.add(element2);
// expect(list.length).toEqual(2);
// const list = new List();
// expect(list.head).toEqual(null);
// const list = new List();
// const element = new Element(1);
// list.add(element);
// expect(list.head.value).toEqual(1);
// const list = new List();
// const element1 = new Element(1);
// const element2 = new Element(3);
// list.add(element1);
// list.add(element2);
// expect(list.head.value).toEqual(3);
// const list = new List();
// const element1 = new Element(1);
// const element2 = new Element(3);
// list.add(element1);
// list.add(element2);
// expect(list.head.next.value).toEqual(1);
// const list = new List([1, 2, 3]);
// expect(list.length).toEqual(3);
// expect(list.head.value).toEqual(3);
// let list = new List([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// expect(list.length).toEqual(10);
// expect(list.head.value).toEqual(10);
// expect(list.head.next.next.next.value).toEqual(7);
// const oneList = new List([1]);
// expect(oneList.toArray()).toEqual([1]);
// const twoList = new List([1, 2]);
// expect(twoList.head.value).toEqual(2);
// expect(list.toArray()).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
// const twoList = new List([1, 2]);
// expect(twoList.reverse().toArray()).toEqual([1, 2]);
// const threeList = new List([1, 2, 3]);
// expect(threeList.reverse().toArray()).toEqual([1, 2, 3]);
// expect(list.reverse().toArray()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// expect(list.reverse().reverse().toArray()).toEqual([ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ]);
// 
