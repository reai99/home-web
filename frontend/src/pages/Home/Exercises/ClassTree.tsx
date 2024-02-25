
import React, { useEffect, useRef, useState } from "react";
import { Tree, Input, Space, Button,  } from "antd";
import type { TreeDataNode } from "antd";
import { useStore } from "@src/_utils/store";
import { formatSelectToTree, getTreeParentKey } from "@src/_utils";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import "./index.less";

interface IProps {
  onSelect?: any;
}

const ClassTree: React.FC<IProps> = (props) => {

  const { onSelect } = props || {};

  const { classtree } = useStore('classtree');

  const [fold, setFold] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const dataListRef = useRef<TreeDataNode[]>([]);

  const getList = async () => {
    const res = await classtree.getList();
    dataListRef.current = res;
    const treeList = formatSelectToTree(res);
    setTreeData(treeList);
    setExpandedKeys(res.map(v => v.key));
  }

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

  // 选择节点
  const handleSelect = (_selectedKeys) => {
    onSelect && onSelect(_selectedKeys);
    setSelectedKeys(_selectedKeys)
  }

  // 展开节点
  const handleExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  // 搜索节点
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newExpandedKeys = dataListRef.current
      .map((item) => (item.title + '').indexOf(value) > -1 ? getTreeParentKey(item.key, treeData) : undefined)
      .filter((item, i, self): item is React.Key =>!!(item && self.indexOf(item) === i));
    setExpandedKeys(newExpandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  // 树折叠
  const hanleFold = () => {
    setFold(!fold);
  }

  useEffect(() => {
    getList();
  }, [])

  const generateFlodBtn = () => {
    return (
      <Button icon={fold ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={hanleFold}/>
    )
  }

  const generateTree = () => {
    return (
      <div className={"classtree-tree-wrapper" +  (fold ? " class-tree-fold" : "")}>
        <Space.Compact style={{ width: '100%' }}>
          {generateFlodBtn()}
          <Input  placeholder="请输入" onChange={handleSearchChange}/>
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
          onExpand={handleExpand}
        />
      </div>
    );
  };

  return generateTree();
};

export default ClassTree;
