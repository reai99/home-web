
import React, { useEffect, useRef, useState } from "react";
import { Tree, Input, Space, Button, notification,  } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import type { TreeDataNode, TreeProps } from "antd";
import { useStore } from "@src/_utils/store";
import ModifyClassTreeModal from "./ModifyClassTreeModal";

import "./index.less";

const CONTEXT_MENU_LIST = [
  { key: 'update', name: '更新节点' },
  { key: 'insertNode', name: '插入兄弟节点' },
  { key: 'insertChildNode', name: '插入子节点' },
  { key: 'delete', name: '删除节点', style: { color: 'red' } },
]

const formatSelectToTree = (list) => {
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
  return loop(listParentMap['-1'] || [])
}

const ClassTree: React.FC = (props) => {

  const { onSelect } = props || {};

  const { classtree } = useStore('classtree');

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [autoExpandParent, setAutoExpandParent] = useState<string>(true);
  const [contextMenuStyle, setContextMenuStyle] = useState<any>({});

  const contextMenuRef = useRef<any>(null);
  const detailModalRef = useRef<any>(null);
  const dataListRef = useRef<TreeDataNode[]>([]);

  const getList = async () => {
    const res = await classtree.getList();
    dataListRef.current = res;
    const treeList = formatSelectToTree(res);
    setTreeData(treeList);
  }

  const getParentKey = (key: React.Key, tree: TreeDataNode[]): React.Key => {
    let parentKey: React.Key;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item) => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey!;
  };

  const formatTreeData = (_treeData) => {
    const result = [..._treeData];
    const loop = (list) => {
      return (list || []).map((v) => {
        const strTitle = v.title as string;
        const index = strTitle.indexOf(searchValue);
        const beforeStr = strTitle.substring(0, index);
        const afterStr = strTitle.slice(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span className="site-tree-search-value">{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{strTitle}</span>
          );
        if (v.children) {
          return { title, key: v.key, children: loop(v.children) };
        }

        return {
          title,
          key: v.key,
        };
      });
    };
    return loop(result);
  };

  const handleDrop: TreeProps["onDrop"] = (info) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]); // the drop position relative to the drop node, inside 0, top -1, bottom 1

    const loop = (
      data: TreeDataNode[],
      key: React.Key,
      callback: (node: TreeDataNode, i: number, data: TreeDataNode[]) => void
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = [...treeData];

    // Find dragObject
    let dragObj: TreeDataNode;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
        item.children.unshift(dragObj);
      });
    } else {
      let ar: TreeDataNode[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        // Drop on the top of the drop node
        ar.splice(i!, 0, dragObj!);
      } else {
        // Drop on the bottom of the drop node
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    setTreeData(data);
  };

  const handleSelect = (_selectedKeys) => {
    onSelect && onSelect(_selectedKeys);
    setSelectedKeys(_selectedKeys)
  }

  // 关闭右键菜单
  const handleCloseContextMenu = () => {
    setContextMenuStyle({})
  }

  // 右键菜单
  const handleRightClick = (e) => {
    const { clientX, clientY } = e?.event || {};
    setSelectedKeys([e.node.key])
    setContextMenuStyle({
      display: 'block',
      top: clientY + 16 + 'px',
      left: clientX + 'px',
    });
    const fn = (e) => {
      if (!contextMenuRef.current?.contains?.(e.target)) {
        window.removeEventListener('click', fn);
        handleCloseContextMenu();
      }
    }
    window.addEventListener('click', fn, true);
  };

  // 展开节点
  const handleExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(dataListRef.current, '123123');
    const newExpandedKeys = dataListRef.current
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, treeData);
        }
        return null;
      })
      .filter(
        (item, i, self): item is React.Key =>
          !!(item && self.indexOf(item) === i)
      );
    console.log(newExpandedKeys, 'newExpandedKeys');
    setExpandedKeys(newExpandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  const handleDeleteNode = async () => {
    await classtree.delete({ params: { ids: selectedKeys.join(',') }});
    notification.success({ message: '删除成功' });
    handleCloseContextMenu();
    getList();
  }

  const handleUpdateNode = (v) => {
    const currNode = dataListRef.current.find((v) => selectedKeys.includes(v.key));
    detailModalRef.current.openModal({
      currNode,
      title: v.name,
      defaultValue: { name: currNode.title },
    });
  }

  const handleInsetNode = (v) => {
    const currNode = dataListRef.current.find((v) => selectedKeys.includes(v.key));
    const parentKey = ({ insertNode: 'parentId', insertChildNode: 'key' })[v.key];
    const parentId = parentKey && currNode[parentKey];
    detailModalRef.current.openModal({
      currNode: {
        parentId
      },
      title: v.name,
    });
  }


  const handleContextMenuClick = (v: any) => {
    switch(v.key) {
      case 'delete':
        handleDeleteNode();
        break;
      case 'update':
        handleUpdateNode(v);
        break;
      default: 
        handleInsetNode(v);
        break;
    }
  }

  useEffect(() => {
    getList();
  }, [])

  const generateTree = () => {
    return (
      <div className="classtree-tree-wrapper">
        <Space.Compact style={{ width: '100%' }}>
          <Input  placeholder="请输入" style={{ marginBottom: 8 }} onChange={handleSearchChange}/>
          <Button onClick={() => handleContextMenuClick({ name: '添加根节点', key: 'root' })}><PlusOutlined /></Button>
        </Space.Compact>
        <Tree
          className="classtree-tree"
          showLine
          showIcon
          draggable
          blockNode
          selectedKeys={selectedKeys}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          treeData={formatTreeData(treeData)}
          onSelect={handleSelect}
          onDrop={handleDrop}
          onExpand={handleExpand}
          onRightClick={handleRightClick}
        />
        <div ref={contextMenuRef} style={contextMenuStyle} className="classtree-contextmenu">
          {CONTEXT_MENU_LIST.map(v => <div className="context-menu-item" style={v.style} key={v.key} onClick={() => handleContextMenuClick(v)}>{v.name}</div>)}
        </div>
        <ModifyClassTreeModal ref={detailModalRef} onFresh={getList}/>
      </div>
    );
  };

  return generateTree();
};

export default ClassTree;
