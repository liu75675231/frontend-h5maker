export function generateVNode () {

}

export function stringifyVNode (vnode) {
  return JSON.stringify(vnode, (key, val) => {
    if (key == 'parentVNode') {
      return undefined;
    }
    return val;
  });
}

export function deepCloneVNodeWithoutEvent (vnode) {
  return JSON.parse(stringifyVNode(vnode));
}
