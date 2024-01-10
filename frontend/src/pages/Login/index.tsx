import { FC } from "react";
import { useStore } from '../../_utils/store';
import { FORM_FIELD_TYPE, DynamicFormRender } from 'antd-dynamic-form-render';
import { Button, Form, notification } from "antd";
import { useNavigate } from 'react-router-dom';

import './index.less';

const { FIELD_TYPE_INPUT } = FORM_FIELD_TYPE;

interface IProps {

}

const Login: FC<IProps> = () => {

  const navigate = useNavigate();

  const [form] = Form.useForm();
  
  const { common } = useStore('common');

  const handleLogin = async () => {
    try {
      const values = await form.validateFields();
      await common.userLogin({ data: values });
      notification.success({
        message: '提示',
        description: '登陆成功'
      })
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    } catch (error) {
      console.log(error);
    }
  }

  const handleToRegister = () => {
    navigate('/register');
  }

  const generateFrom = () => {
    const formProps = {
      form,
      mode: 'edit',
      size: 'default',
      layoutType: 'normal',
      rowCount: 1,
      formList: [
        {
          title: '账号',
          name: 'username',
          isRequired: '1',
          fieldType: FIELD_TYPE_INPUT,
          rules: [
            { max: 15, type: 'number', message: '最大长度为15' },
          ],
        },
        {
          title: '密码',
          name: 'password',
          isRequired: '1',
          fieldType: FIELD_TYPE_INPUT,
          type: 'password',
          rules: [
            { max: 16, type: 'number', message: '最大长度为16' },
          ],
        }
      ]
    }
    return <DynamicFormRender {...formProps} />
  }

  const generateButton = () => {
    return (
      <div className="login-btn-warpper">
        <Button type="primary" onClick={handleLogin}>登陆</Button>
        <a className="login-btn-register" onClick={handleToRegister}>注册</a>
      </div>
    )
  }
  
  return (
    <div className="login-container">
      <div className="login-warpper">
        <div className="login-title">登陆</div>
        {generateFrom()}
        {generateButton()}
      </div>
    </div>
  )
}

export default Login;