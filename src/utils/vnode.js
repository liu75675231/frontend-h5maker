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

export function generatorVNodeHandler () {
  return {
    input (dom, vnode) {
      vnode.attrs.type = dom.getAttribute("type");
      vnode.attrs.name = vnode.attrs.type;
      vnode.attrs.value = '';
    },
    img (dom, vnode) {
      vnode.attrs.src = dom.getAttribute("src");
    },
  };
}

