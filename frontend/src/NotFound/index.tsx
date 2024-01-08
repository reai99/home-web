import './index.less';

const NotFound: FC<IProps> = () => {
  return (
    <div className="not-found-wrapper">
      <div class="starsec"></div>
      <div className="lamp__wrap">
        <div className="lamp">
          <div className="cable"></div>
          <div className="cover"></div>
          <div className="in-cover">
            <div className="bulb"></div>
          </div>
          <div className="light"></div>
        </div>
      </div>
      <section className="error">
        <div className="error__content">
          <div className="error__message message">
            <h1 className="message__title">Not Found</h1>
            <p className="message__text">
              不好意思，你访问的页面不存在，请关灯后重新尝试
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
