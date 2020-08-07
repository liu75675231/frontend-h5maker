export function generateVNodeTree (treeNode, createElement) {
  const children = [];
  treeNode.children && treeNode.children.forEach((elem) => {
    if (typeof elem === 'string') {
      children.push(elem);
    } else {
      children.push(generateVNodeTree(elem, createElement));
    }
  });

  treeNode.attrs['event'] = JSON.stringify(treeNode.event);
  return createElement(treeNode.tag, {
    attrs: JSON.parse(JSON.stringify(treeNode.attrs || {})),
    on: treeNode.on || {},
    style: treeNode.style || {},
    class: treeNode.class || {},
  }, children);
}
