import React, { FC, useState } from 'react';
import CodeMirror, { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import "./index.less";

const CodeExecutor: FC<ReactCodeMirrorProps> = (props) => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const executeCode = () => {
    try {
      const res = eval(code);
      const result = typeof res === 'object' ? JSON.stringify(res) : (res + '').toString();
      setOutput(result);
    } catch (error) {
      setOutput(error.toString());
    }
  };

  return (
    <div>
      <div className='code-mirror-title-wrapper'>
        <div className='code-mirror-title'>代码调试工具（react-codemirror）</div>
        <div className='code-mirror-btn'>
          <button onClick={executeCode}>执行</button>
        </div>
      </div>
      <CodeMirror
        value={code}
        theme="dark"
        height="300px"
        {...props}
        extensions={[javascript({ jsx: true })]}
        onChange={(value) => setCode(value)}
      />
      <div className='code-mirror-result-wrapper'>
        <div className='code-mirror-result-title'>执行结果：</div>
        <div>{output}</div>
      </div>
    </div>
  );
};

export default CodeExecutor;
