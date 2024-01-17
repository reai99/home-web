import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import './index.less';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const LoadingComponent: React.FC = () => <div className='loading-component-wrapper'><Spin indicator={antIcon} /></div>

export default LoadingComponent;