import { Form, Spin, Tabs, TabsProps } from "antd";
import React, { useEffect, useState } from "react";
import MDEditor from '@uiw/react-md-editor';
import CodeExecutor from "@src/_components/CodeExecutor";
import { useStore } from "@src/_utils/store";

const ClassDetail: React.FC = (props) => {

  const { classId } = props || {};

  const [form] = Form.useForm();
  const { classtree } = useStore('classtree');
  const [loading, setLoading] = useState<boolean>(false);
  const [detail, setDetail] = useState<any>({});

  const fetchDetail = async () => {
    try {
      setLoading(true);
      form.resetFields();
      const res = await classtree.detail({ params: { classId }});
      setLoading(false);
      setDetail(res?.[0]);
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(classId) {
      fetchDetail();
    }
  }, [classId]);

  const generateBaseInfo = () => {
    const { description, title } = detail || {};
    return (
      <div className="classtree-view-baseinfo">
        <div className="classtree-view-title"> <span>【标题】</span>{title} </div>
        <div>
          { description && <MDEditor.Markdown source={description} style={{ whiteSpace: 'pre-wrap' }}/>}
        </div>
      </div>
    )
  }

  const generateCodePractice = () => {
    return <CodeExecutor/>
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '基本内容',
      children: generateBaseInfo(),
    },
    {
      key: '2',
      label: '代码练习',
      children: generateCodePractice(),
    },
  ];

  return (
    <Spin spinning={loading}>
      <Tabs items={items} />
    </Spin>
  )
}

export default ClassDetail;