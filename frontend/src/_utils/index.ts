import React from 'react';
import type { TreeDataNode } from "antd";

/**
 *  转化平铺数组为树形结构
 * @param list 平铺数组
 * @param rootId 根节点的id
 * @returns 
 */
export const formatSelectToTree = (list: Record<string, any>[], rootId = '-1') => {
  const listParentMap = {};
  list.forEach(item => {
    if(!listParentMap[item.parentId]) listParentMap[item.parentId] = [];
    listParentMap[item.parentId].push(item);
  });
  const loop = (list) => {
    return list.map((v) => {
      let children = listParentMap[v.key];
      if(children) children = loop(children);
      return {
        ...v,
        children,
      }
    })
  };
  return loop(listParentMap[rootId] || [])
}

/**
 * 
 * @param key 
 * @param tree 
 * @returns 
 */
export const getTreeParentKey = (key: React.Key, tree: TreeDataNode[]): React.Key => {
  let parentKey: React.Key;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getTreeParentKey(key, node.children)) {
        parentKey = getTreeParentKey(key, node.children);
      }
    }
  }
  return parentKey!;
};