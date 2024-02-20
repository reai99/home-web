import React, { useState } from "react";
import { ConfigProvider } from "antd";

import ClassTree from "./ClassTree";
import ClassDetail from "./ClassDetail";

import "./index.less";

const Exercises: React.FC = () => {

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const handleTreeSelect = (_selectedKeys) => {
    setSelectedKeys(_selectedKeys);
  }

  const generateTree = () => {
    return <ClassTree onSelect={handleTreeSelect} />;
  };

  const generateContent = () => {

    return (
      <div className="classtree-content">
        { selectedKeys.length > 0 ? <ClassDetail classId={selectedKeys[0]}/> : '请选择左侧树' }
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
