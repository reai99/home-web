import React from "react";
import MDEditor from '@uiw/react-md-editor';

const MdEditorComp = (props) => {
  const { onChange, defaultValue, value } = props;

  return (
    <div className="container">
      <MDEditor
        height={`calc(100vh - 360px)`}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      />
            {/* <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} /> */}
    </div>
  );
}
// import React from 'react';
// import MarkdownIt from 'markdown-it';
// import MdEditor from 'react-markdown-editor-lite';
// import 'react-markdown-editor-lite/lib/index.css';

// // Register plugins if required
// // MdEditor.use(YOUR_PLUGINS_HERE);

// // Initialize a markdown parser
// const mdParser = new MarkdownIt(/* Markdown-it options */);

// // eslint-disable-next-line react-refresh/only-export-components
// const MdEditorComp = (props) => {
//   const { onChange, defaultValue, value } = props;

//   const handleEditorChange = ( { text }) => {
//     onChange && onChange(text);
//   }

//   return (
//     <MdEditor 
//       style={{ height: '500px' }}
//       defaultValue={defaultValue}
//       value={value}
//       renderHTML={text => mdParser.render(text)}
//       onChange={handleEditorChange}
//       />
//   );
// };

export default MdEditorComp;