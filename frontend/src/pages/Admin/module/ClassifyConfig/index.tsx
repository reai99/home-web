import React, { useMemo, useState } from "react";
import { useStore } from '../../../../_utils/store';
import { FORM_FIELD_TYPE } from 'antd-dynamic-form-render';
import ConmonView from "../../component/CommonView";

import { TargetTypeList } from "@src/_constants";
import { useNavigate } from "react-router-dom";

const {
  FIELD_TYPE_INPUT,
  FIELD_TYPE_TEXTAREA,
  FIELD_TYPE_SWITCH,
  FIELD_TYPE_SELECT,
} = FORM_FIELD_TYPE;

const ClassifyConfig = () => {


  const navigate = useNavigate();
  const { admin } = useStore('admin');

  const [targetType, setTargetType] = useState<string>('');

  const targetTypeMap = useMemo(() => TargetTypeList.reduce((r, c) => {
    r[c.code] = c.name;
    return r;
  }, {}), []);

  const conmmonProps: any = {
    columns: [
      {
        title: "分类编码",
        dataIndex: "classCode",
        width: 150,
      },
      {
        title: "分类名称",
        dataIndex: "className",
        width: 160,
      },
      {
        title: "描述",
        dataIndex: "description",
        width: 400,
      },
      {
        title: "打开类型",
        dataIndex: "targetType",
        render: (val) => targetTypeMap[val],
      },
      {
        title: "自定义路径",
        dataIndex: "serverUrl",
        width: 200,
        render: (url) => {
          if(!url) return null;
          if(/^(http|https):\/\/[a-zA-Z0-9-.]+(.[a-zA-Z]{2,3})?(:[0-9]{1,5})?(\/.*)?$/g.test(url)) {
            return <a onClick={() => window.open(url, '_blank')}>{url}</a>;
          } else {
            return <a onClick={() => navigate(url)}>{url}</a>;
          }
        }
      },
      {
        title: "是否启用",
        dataIndex: "isEnabled",
        width: 90,
        render: (val) => val === '1' ? '启用' : '禁用',
      },
    ],
    formList: [
      {
        title: "分类编码",
        name: "classCode",
        fieldType: FIELD_TYPE_INPUT,
        isRequired: "1",
        defaultValue: 'CLASSIFY_',
        rules: [
          { pattern: /^[A-Z_]+$/g, message: "只允许输入大写和下划线" },
          { max: 20, message: "最大长度为20" },
        ],
      },
      {
        title: "分类名称",
        name: "className",
        fieldType: FIELD_TYPE_INPUT,
        isRequired: "1",
        rules: [{ max: 20, message: "最大长度为20" }],
      },
      {
        title: "打开类型",
        name: "targetType",
        isRequired: "1",
        fieldType: FIELD_TYPE_SELECT,
        dataSource: TargetTypeList,
        onChange: (val) => setTargetType(val || ''),
      },
      {
        title: "自定义路径",
        name: "serverUrl",
        fieldType: FIELD_TYPE_INPUT,
        isRequired: "1",
        isEnabled: targetType === '3' ? '1' : '0',
      },
      {
        title: "描述",
        name: "description",
        fieldType: FIELD_TYPE_TEXTAREA,
        isRequired: "1",
        autoSize: { minRows: 6 },
        rules: [{ max: 500, message: "最大长度为500" }],
      },
      {
        title: "是否启用",
        name: "isEnabled",
        fieldType: FIELD_TYPE_SWITCH,
        isRequired: "1",
        checkedChildren: '启用',
        unCheckedChildren: '禁用',
      },
    ],
    api: {
      list: admin.getClassifyList,
      add: admin.addClassify, 
      upd: admin.updClassify,
      del: admin.delClassify,
    },
    onEvent: {
      openModal: (row) => setTargetType(row?.targetType || ''),
    },
  };

  return <ConmonView {...conmmonProps} />;
};

export default ClassifyConfig;
