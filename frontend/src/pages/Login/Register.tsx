import { FC } from "react";
import { useStore } from '../../_utils/store';
import { FORM_FIELD_TYPE, DynamicFormRender } from 'antd-dynamic-form-render';
import { Button, Form, notification } from "antd";

import './index.less';

const { FIELD_TYPE_INPUT } = FORM_FIELD_TYPE;

interface IProps {

}

const Login: FC<IProps> = () => {

  const [form] = Form.useForm();
  
  const { common } = useStore('common');

  const handleRegister = async () => {
    try {
      const values = await form.validateFields();
      const { password, password2, username } = values || {};
      if(password !== password2) {
        notification.error({
          message: '提示',
          description: '两次输入密码不相同'
        });
        return;
      }
      await common.userRegister({ data: { password, username } });
      notification.success({
        message: '提示',
        description: '注册成功'
      })
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    } catch (error) {
      console.log(error);
    }
  }

  const generateFrom = () => {
    const formProps = {
      form,
      mode: 'edit',
      size: 'default',
      layoutType: 'layout',
      rowCount: 1,
      formList: [
        {
          title: '账号',
          name: 'username',
          isRequired: '1',
          placeholder: '请输入账号',
          fieldType: FIELD_TYPE_INPUT,
          rules: [
            { max: 30, message: '最大长度为30' },
          ],
        },
        {
          title: '密码',
          name: 'password',
          isRequired: '1',
          fieldType: FIELD_TYPE_INPUT,
          type: 'password',
          placeholder: '请输入密码',
          rules: [
            { max: 30, message: '最大长度为30' },
          ],
        },
        {
          title: '重复密码',
          name: 'password2',
          isRequired: '1',
          fieldType: FIELD_TYPE_INPUT,
          type: 'password',
          placeholder: '请再次输入密码',
          rules: [
            { max: 30, message: '最大长度为30' },
          ],
        }
      ]
    }
    return <DynamicFormRender {...formProps} />
  }

  const generateButton = () => {
    return (
      <div className="login-btn-warpper">
        <Button type="primary" onClick={handleRegister}>注册</Button>
      </div>
    )
  }
  
  return (
    <div className="login-container">
      <div className="login-warpper">
        <div className="login-title">注册</div>
        {generateFrom()}
        {generateButton()}
      </div>
    </div>
  )
}

export default Login;