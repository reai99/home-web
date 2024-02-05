import React, { useEffect, useMemo, useState } from "react";
import { useStore } from '../../../../_utils/store';
import { FORM_FIELD_TYPE } from 'antd-dynamic-form-render';
import ConmonView from "../../component/CommonView";
import { TargetTypeList } from "@src/_constants";
import { useNavigate } from "react-router-dom";

const {
  FIELD_TYPE_INPUT,
  FIELD_TYPE_SELECT,
  FIELD_TYPE_TEXTAREA,
  FIELD_TYPE_SWITCH,
} = FORM_FIELD_TYPE;

const ModuleConfig = () => {

  const navigate = useNavigate();
  const { admin } = useStore('admin');

  const [classifyList, setClassifyList] = useState<Record<string, unknown>[]>([]);
  const [targetType, setTargetType] = useState<string>('');

  const targetTypeMap = useMemo(() => TargetTypeList.reduce((r, c) => {
    r[c.code] = c.name;
    return r;
  }, {}), []);

  useEffect(() => {
    admin.getClassifyList({ data: { target: '2' }}).then((res) => {
      const _list = (res || []).map(v => ({ ...v, name: v.className, code: v.classCode }));
      setClassifyList(_list)
    })
  }, []);

  const handleFormatSubmitData = (values) => {
    const { classCode, className } = values || {};
    if(!classCode) {
      values.className = classifyList.find(v => v.code === className)?.name;
      values.classCode = className;
    }
    return values;
  };

  const conmmonProps: any = {
    columns: [
      {
        title: "分类编码",
        dataIndex: "classCode",
        width: 120,
        render: (text, record) => record?.className,
      },
      {
        title: "模块编码",
        dataIndex: "moduleCode",
        width: 140,
      },
      {
        title: "模块名称",
        dataIndex: "moduleName",
        width: 140,
      },
      {
        title: "打开类型",
        dataIndex: "targetType",
        render: (val) => targetTypeMap[val],
      },
      {
        title: "地址",
        dataIndex: "serverUrl",
        width: 140,
        render: (url) => {
          if(!url) return null;
          if(/^(http|https):/g.test(url)) {
            return <a onClick={() => window.open(url, '_blank')}>{url}</a>;
          } else {
            return <a onClick={() => navigate(url)}>{url}</a>;
          }
        }
      },
      {
        title: "描述",
        dataIndex: "description",
        width: 400,
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
        title: "分类名称",
        name: "className",
        fieldType: FIELD_TYPE_SELECT,
        isRequired: "1",
        dataSource: classifyList,
      },
      {
        title: "模块编码",
        name: "moduleCode",
        fieldType: FIELD_TYPE_INPUT,
        isRequired: "1",
        defaultValue: 'MODULE_',
        rules: [
          { pattern: /^[A-Z_]+$/g, message: "只允许输入大写和下划线" },
          { max: 20, message: "最大长度为20" },
        ],
      },
      {
        title: "模块名称",
        name: "moduleName",
        fieldType: FIELD_TYPE_INPUT,
        isRequired: "1",
        rules: [{ max: 20, message: "最大长度为20" }],
      },
      {
        title: "打开类型",
        name: "targetType",
        isRequired: "1",
        fieldType: FIELD_TYPE_SELECT,
        dataSource: TargetTypeList.filter(v => v.code !== '2'),
        onChange: (val) => setTargetType(val || ''),
      },
      {
        title: "地址",
        name: "serverUrl",
        fieldType: FIELD_TYPE_INPUT,
        isRequired: "1",
        isEnabled: targetType === '3' ? '1' : '0',
      },
      {
        title: "描述",
        name: "description",
        fieldType: FIELD_TYPE_TEXTAREA,
        autoSize: { minRows: 6 },
        isRequired: "1",
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
      list: admin.getModulesList,
      add: admin.addModules, 
      upd: admin.updModules,
      del: admin.delModules,
    },
    onEvent: {
      formatData: handleFormatSubmitData,
      openModal: (row) => setTargetType(row?.targetType || ''),
    }
  };

  return <ConmonView {...conmmonProps} />;
};

export default ModuleConfig;
