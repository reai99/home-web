import { Form, Spin, Tabs, TabsProps } from "antd";
import React, { useEffect, useState } from "react";
import { DynamicFormRender, FORM_FIELD_TYPE } from 'antd-dynamic-form-render';
import MdEditorComp from "@src/_components/MdEditor";
import CodeExecutor from "@src/_components/CodeExecutor";
import { useStore } from "@src/_utils/store";

const { FIELD_TYPE_INPUT, FIELD_TYPE_COMPONENT } = FORM_FIELD_TYPE;

const ClassDetail: React.FC = (props) => {

  const { classId } = props || {};

  const [form] = Form.useForm();
  const { classtree } = useStore('classtree');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      form.resetFields();
      const res = await classtree.detail({ params: { classId }});
      setLoading(false);
      form.setFieldsValue({ ...res?.[0] });
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
    const formProps = {
      form,
      mode: 'view',
      formLayout: { labelCol: { span: 3 }, wrapperCol: { span: 21 } },
      layoutType: 'layout',
      rowCount: 1,
      formList: [
        {
          title: '标题',
          name: 'title',
          isRequired: '1',
          fieldType: FIELD_TYPE_INPUT,
          rules: [
            { max: 100, message: '最大长度为100' },
          ],
        },
        {
          title: '描述',
          name: 'description',
          fieldType: FIELD_TYPE_COMPONENT,
          component: MdEditorComp,
        }
      ],
    }
    return <DynamicFormRender {...formProps} />
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