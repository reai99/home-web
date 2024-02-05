import React, {
  FC,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Modal } from "antd";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import "./index.less";

type ContentIProp = {
  title?: string;
  content?: any;
};

interface IProps {}

const CModal: FC<IProps> = forwardRef((props, ref) => {
  
  const contentRef = useRef<ContentIProp>({});
  const [open, setOpen] = useState<boolean>(false);
  const [isScreen, setIsScreen] = useState<boolean>(false);

  const handleScreen = () => {
    setIsScreen(!isScreen);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    openModal: (config) => {
      contentRef.current = {
        title: config?.title,
        content: config?.content,
      };
      setOpen(true);
    },
  }));

  const generateTitle = () => {
    return (
      <>
        <span className="margin-right-16">
          {contentRef.current?.title || "详情"}
        </span>
        <span onClick={handleScreen}>
          {isScreen ? (
            <FullscreenExitOutlined className="cursor_pointer" />
          ) : (
            <FullscreenOutlined className="cursor_pointer" />
          )}
        </span>
      </>
    );
  };

  const generateModal = () => {
    return (
      <Modal
        title={generateTitle()}
        width={isScreen ? "100%" : 800}
        className={`${isScreen ? "screen-full-modal" : ""}`}
        open={open}
        footer={null}
        maskClosable={true}
        onCancel={handleCancel}
      >
        <div>{contentRef.current?.content || "暂无内容"}</div>
      </Modal>
    );
  };

  return generateModal();
});

export default CModal;
