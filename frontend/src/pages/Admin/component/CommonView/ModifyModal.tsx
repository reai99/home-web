import React, { FC, useState, forwardRef, useImperativeHandle, useRef } from "react";
import { DynamicFormRender } from 'antd-dynamic-form-render';
import { Form, Modal, notification } from "antd";
import { isEmpty, each } from 'lodash';

interface IProps {
  formList: unknown[],
  api: unknown[],
  onOk: () => void;
  onEvent?: {
    openModal: () => void,
    formatData: () => void,
    cancelModal: () => void,
  }
}

const ModifyModal: FC<IProps> = forwardRef((props, ref) => {

  const { formList, api, onOk, onEvent } = props;

  const [form] = Form.useForm();

  const [open, setOpen] = useState<boolean>(false);
  const initialValuesRef = useRef<Record<string, unknown>>({})
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const isEditMode = !isEmpty(initialValuesRef.current);

  const formatValues = (values) => {
    const result = {};
    each(values, (val, key) => {
      result[key] = val;
      if(typeof val === 'boolean') result[key] = val ? '1' : '0';
    })
    return result;
  }

  const handleSubmit = ()=> {
    form.validateFields().then(async (values) => {
      try {
        setConfirmLoading(true);
        const request = isEditMode ? api.upd : api.add;
        let _values = { ...initialValuesRef.current, ...values };
        _values = formatValues(onEvent?.formatData?.(_values) || _values);
        await request({ data: _values });
        setConfirmLoading(false);
        setOpen(false);
        notification.success({ message: '更新成功' });
        onOk && onOk();
      } catch (error) {
        setConfirmLoading(false);
        notification.error({ message: error?.message || '操作失败，请稍后重试' });
      }
    })
  }

  const handleCancel = () => {
    initialValuesRef.current = {};
    form.resetFields();
    onEvent?.cancelModal?.(row || {});
    setOpen(false);
  }

  useImperativeHandle(ref, () => ({
    openModal: (row) => {
      initialValuesRef.current = row;
      form.setFieldsValue(row || {});
      onEvent?.openModal?.(row || {});
      setOpen(true);
    },
  }))

  const generateContent = () => {
    const formProps = {
      form,
      mode: 'edit',
      // layout: 'vertical',
      formLayout: { labelCol: { span: 4 }, wrapperCol: { span: 20 } },
      layoutType: 'layout',
      rowCount: 1,
      formList: formList || [],
    }
    return <DynamicFormRender {...formProps} />
  }

  const generateModal = () => {
    return (
      <Modal
        open={open}
        width={600}
        confirmLoading={confirmLoading}
        title="分类管理"
        maskClosable={false}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        {generateContent()}
      </Modal>
    )
  }

  return generateModal()
})

export default ModifyModal;