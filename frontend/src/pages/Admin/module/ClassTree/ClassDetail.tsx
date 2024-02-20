import { Button, Form, Spin, Tabs, TabsProps, notification } from "antd";
import React, { useEffect, useState } from "react";
import { DynamicFormRender, FORM_FIELD_TYPE } from 'antd-dynamic-form-render';
import MdEditorComp from "@src/_components/MdEditor";
import { useStore } from "@src/_utils/store";

interface IProps {
  classId?: string;
}

const { FIELD_TYPE_INPUT, FIELD_TYPE_COMPONENT } = FORM_FIELD_TYPE;

const ClassDetail: React.FC<IProps> = (props) => {

  const { classId } = props;

  const [form] = Form.useForm();
  const { classtree } = useStore('classtree');
  const [loading, setLoading] = useState<boolean>(false);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

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

  const handleSave = async () => {
    try {
      setSaveLoading(true);
      const values = await form.validateFields();
      await classtree.detailSave({ data: { ...values, classId }});
      setSaveLoading(false);
      notification.success({ message: '保存成功' });
    } catch (error) {
      setSaveLoading(false);
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
      mode: 'edit',
      layout: 'vertical',
      // formLayout: { labelCol: { span: 3 }, wrapperCol: { span: 21 } },
      layoutType: 'normal',
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

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '基本内容',
      children: generateBaseInfo(),
    },
  ];

  const generateToolbar = () => {
    return (
      <>
        <Button type="primary" size="small" onClick={handleSave} loading={saveLoading}>保存</Button>
      </>
    )
  }

  return (
    <Spin spinning={loading}>
      <Tabs items={items} tabBarExtraContent={{ right: generateToolbar() }}/>
    </Spin>
  )
}

export default ClassDetail;