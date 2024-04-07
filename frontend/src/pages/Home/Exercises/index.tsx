import React, { useState } from "react";
import { ConfigProvider } from "antd";

import ClassTree from "./ClassTree";
import ClassDetail from "./ClassDetail";

import "./index.less";
import { useStore } from "@src/_utils/store";

const Exercises: React.FC = () => {

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const { classtree } = useStore('classtree');

  const handleTreeSelect = (_selectedKeys) => {
    setSelectedKeys(_selectedKeys);
  }

  const generateTree = () => {
    return <ClassTree onSelect={handleTreeSelect} selectedKeys={selectedKeys} />;
  };

  const hanleChangeSelectTree = (dir: string) => {
    const selecteKey = selectedKeys[0];
    if(selecteKey) {
      const index = (classtree.classTreeList || []).findIndex((v): any => selecteKey === v.key);
      let newIndex = dir === 'l' ? index - 1 : index + 1;
      newIndex = (newIndex < 0 ? newIndex + classtree.classTreeList.length : newIndex) %  classtree.classTreeList.length;
      setSelectedKeys([classtree.classTreeList[newIndex]?.key || '']);
    } else {
      setSelectedKeys([classtree.classTreeList[0]?.key || ''])
    }
  }

  const generateContent = () => {
    return (
      <div className="classtree-content">
        { selectedKeys.length > 0 ? <ClassDetail classId={selectedKeys[0]} onChangeTree={hanleChangeSelectTree} /> : '请选择左侧树' }
      </div>
    );
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: "transparent",
          colorText: "#bbb",
        },
        components: {
          Tree: {
            nodeSelectedBg: "rgba(233,244,254,0.2)",
          },
        },
      }}
    >
      <div className="classtree-title">知识学习库</div>
      <div className="classtree-wrapper">
        {generateTree()}
        {generateContent()}
      </div>
    </ConfigProvider>
  );
};

export default Exercises;
