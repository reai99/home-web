import { FC, useEffect, useState } from "react";

import './index.less';

const STR = 'ZHU QIAN YANG';

interface IProps {

}

interface styleDistanceProps {
  [key: number]: Record<string, string>
}

const CardBox:FC <IProps> = () => {

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
  }, [])

  const generateCardCol = (v: string, i: number) => {
    return (
      <div className="card-box-item" style={styleDistance[i]}>
        <div className="card-box-item-container">
          <div className="mask">{v}</div>
        </div>
      </div>
    )
  }

  const generateCard = () => {
    return (
      <div className="card-box-wrapper" >
        {STR.split('').map((v, i) => generateCardCol(v, i))}
      </div>
    )
  }

  return generateCard();
}

export default CardBox;