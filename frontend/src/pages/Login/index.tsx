import { FC } from "react";
import { FORM_FIELD_TYPE, DynamicFormRender } from 'antd-dynamic-form-render';
import { Button, Form } from "antd";

import './index.less';

const { FIELD_TYPE_INPUT } = FORM_FIELD_TYPE;

interface IProps {

}

const Login: FC<IProps> = () => {

  const [form] = Form.useForm();

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
            { max: 30, message: '最大长度为30' },
          ],
        },
        {
          title: '密码',
          name: 'password',
          isRequired: '1',
          fieldType: FIELD_TYPE_INPUT,
          type: 'password',
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
        <Button type="primary">登陆</Button>
        <a className="login-btn-register">注册</a>
      </div>
    )
  }
  
  return (
    <div className="login-warpper">
      <div className="login-title">登陆</div>
      {generateFrom()}
      {generateButton()}
    </div>
  )
}

export default Login;