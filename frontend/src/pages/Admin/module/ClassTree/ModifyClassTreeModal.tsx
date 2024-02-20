
import React, { MutableRefObject, forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Form, notification } from "antd";
import CModal from "@src/_components/CModal";
import { FORM_FIELD_TYPE, DynamicFormRender } from 'antd-dynamic-form-render';
import { useStore } from "@src/_utils/store";

interface IProps {
  ref?: any;
  onFresh?: any;
}

const { FIELD_TYPE_INPUT } = FORM_FIELD_TYPE;

const ModifyClassTreeModal: React.FC<IProps> =forwardRef((props, ref) => {

  const { onFresh } = props;

  const { classtree } = useStore('classtree');

  const [form] = Form.useForm();
  const [open, setOpen] = useState<boolean>(false);
  const detailModalRef = useRef<any>(null);
  const currNodeRef = useRef({});

  const handleSubmit = async () => {
    const { key, parentId } = currNodeRef.current as any;
    const values = await form.validateFields();
    const request = key ? classtree.update : classtree.add;
    await request({ 
      data: {
        parentId: parentId || '-1',
        id: key,
        ...values,
      }
    });

    onFresh && onFresh();
    setOpen(false);
    form.resetFields();
    notification.success({ message: key ? '更新成功' : '添加成功' })
  }

  const generateContent = () => {
    const formProps = {
      form,
      mode: 'edit',
      formLayout: { labelCol: { span: 4 }, wrapperCol: { span: 20 } },
      layoutType: 'layout',
      rowCount: 1,
      formList: [
        {
          title: '名称',
          name: 'name',
          isRequired: '1',
          fieldType: FIELD_TYPE_INPUT,
          rules: [
            { max: 50, message: '最大长度为50' },
          ],
        },
      ]
    }
    return <DynamicFormRender {...formProps} />
  }

  useImperativeHandle(ref, () => ({
    openModal: (config) => {
      detailModalRef.current.openModal?.(config);
      form.setFieldsValue(config?.defaultValue || {});
      currNodeRef.current = config.currNode;
      setOpen(true);
    },
  }));
  
  return (
    <CModal 
      ref={detailModalRef}
      width={400}
      open={open}
      content={generateContent()}
      footer={undefined}
      onCancel={() => { setOpen(false)}}
      onOk={handleSubmit}
    />
  )
})

export default ModifyClassTreeModal;