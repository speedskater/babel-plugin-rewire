// import something (and then use it) to convince Rewire it's worth to add some
// stuff to this module
import dummyDep from './dummy-dep';

dummyDep();

export function fn1() {
  return 1;
}