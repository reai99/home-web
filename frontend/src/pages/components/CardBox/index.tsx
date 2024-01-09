import React, { FC, useEffect } from "react";

import './index.css';

const STR = 'ZHU QIAN YANG';

interface IProps {

}

const CardBox:FC <IProps> = () => {

  useEffect(() => {
    const elements = document.getElementsByClassName("element");
    // 添加鼠标移动事件监听器
    document.addEventListener("mousemove", function (event) {
      // 获取鼠标位置
      const mouseX = event.pageX;
      const mouseY = event.pageY;

      // 遍历元素并输出距离鼠标的坐标
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const rect = element.getBoundingClientRect();
        const elementX = rect.left + window.pageXOffset;
        const elementY = rect.top + window.pageYOffset;

        const distanceX = mouseX - elementX;
        const distanceY = mouseY - elementY;
        
        // 将距离值设置到每一个卡片元素上面
        element.style.setProperty('--x', distanceX + 'px');
        element.style.setProperty('--y', distanceY + 'px');
    }
});
  }, [])

  const generateCardCol = (v) => {
    return (
      <div className="card">
        <div className="element">
          <div className="mask">{v}</div>
        </div>
      </div>
    )
  }

  const generateCard = () => {
    return (
      <div className="box">
        {STR.split('').map((v) => generateCardCol(v))}
      </div>
    )
  }

  return generateCard();
}

export default CardBox;