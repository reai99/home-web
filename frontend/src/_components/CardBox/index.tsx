// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import CModal from "../CModal";
import './index.less';

export type ItemProps = {
  title: string;
  code: string;
  classCode?: string;
  className?: string;
  targetType?: string;
  serverUrl?: string;
  tagName?: string;
  tagColor?: string;
  description?: string;
};

export type ItemEvent = {
  click: (record: unknown) => void
}

interface IProps {
  items?: ItemProps[];
  onEvent?: ItemEvent;
}

interface styleDistanceProps {
  [key: number]: Record<string, string>
}

const CardBox:FC <IProps> = (props) => {

  const { items, onEvent } = props;

  const navigate = useNavigate();

  const detailModalRef = useRef(null);
  const [styleDistance, setStyleDistance] = useState<styleDistanceProps>({});

  useEffect(() => {
    const elements = document.getElementsByClassName("card-box-item");
    // 添加鼠标移动事件监听器
    document.addEventListener("mousemove", function (event) {
      // 获取鼠标位置
      const mouseX = event.pageX;
      const mouseY = event.pageY;
      const _styleInstance: styleDistanceProps = {};
      // 遍历元素并输出距离鼠标的坐标
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const rect = element.getBoundingClientRect();
        const elementX = rect.left + window.pageXOffset;
        const elementY = rect.top + window.pageYOffset;

        const distanceX = mouseX - elementX;
        const distanceY = mouseY - elementY;

        _styleInstance[i] = {
          '--x': distanceX + 'px',
          '--y': distanceY + 'px'
        }
      }
      setStyleDistance({
        ...styleDistance,
        ..._styleInstance,
      })
    });
  }, [styleDistance]);

  const handleClick = (v: ItemProps, e) => {
    switch (v.targetType) {
      case '1':
        detailModalRef.current?.openModal({
          title: v.className,
          content: v.description,
        });
        break;
      case '2':
        onEvent?.click?.(v);
        break;
      case '3':
        /^(http|https|ftp):\/\//g.test(v.serverUrl) ? window.open(v.serverUrl, '_blank') : navigate(v.serverUrl);
        break;
    }
  }

  const generateCardCol = (v: ItemProps, i: number) => {
    return (
      <div 
        className="card-box-item"
        style={{
          "--timer": i*0.15 + "s", 
          ...styleDistance[i],
        }}
      >
        <div className="card-box-item-container" onClick={(e) => handleClick(v, e)}>
          <div className="card-box-content">
            <div className="card-box-tag" style={{ background: v.tagColor }}>{v.tagName}</div>
            <div className="card-box-title">{v.title}</div>
            <div className="card-box-desc">{v.description}</div>
          </div>
        </div>
      </div>
    )
  }

  const generateCard = () => {
    return (
      <div className="card-box-wrapper" >
        {items.map((v, i) => generateCardCol(v, i))}
        {<CModal ref={detailModalRef}/>}
      </div>
    )
  }

  return generateCard();
}

export default CardBox;