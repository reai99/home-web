// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { FC, useEffect, useRef, useState } from "react";
import { Button, Tooltip, Popconfirm, notification } from "antd";
import { QuestionCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import AgGridEditTable from "../../../../_components/AgGridEditTable";
import ModifyModal from "./ModifyModal";

import "./index.less";

type EventProps = {
  openModal: (record?: any) => void,
  formatData: (record?: any) => void,
  cancelModal: (record?: any) => void,
}

export interface IProps {
  columns: Record<string, any>[];
  dataSource: any[];
  formList: any[];
  api: Record<string, any>;
  onEvent?: EventProps;
}

const ConmonView: FC<IProps> = (props) => {
  const { columns, formList, api, onEvent } = props;

  let gridApi;
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState([]);
  const agGridEditTableRef = useRef(null);
  const modifyModalRef = useRef(null);

  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await api?.list();
      setLoading(false);
      setDataSource(res);
    } catch (error) {
      setLoading(false);
    }
  };
  const operateColumn = [
    {
      title: "操作",
      dataIndex: "operate",
      width: 100,
      fixed: "right",
      render: (text, record) => {
        return (
          <div className="operate-wrapper">
             <Tooltip title="编辑">
                <EditOutlined onClick={() => handleEdit(record)} />
              </Tooltip>
            <Popconfirm
              title="确定要删除吗？"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => handleDelete(record)}
            >
              <Tooltip title="删除">
                <DeleteOutlined style={{ color: "red" }} />
              </Tooltip>
            </Popconfirm>
            
          </div>
        );
      },
    },
  ];

  const onGridReady = (params) => {
    gridApi = params.api;
    gridApi?.sizeColumnsToFit?.();
  };

  const handleEdit = (record) => {
    modifyModalRef.current?.openModal(record);
  };

  const handleDelete = async (record) => {
    try {
      await api.del({ params: { ids: record?.id} });
      notification.success({ message: '删除成功' });
      fetchList();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = () => {
    modifyModalRef.current?.openModal(true);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const generateToolbar = () => {
    return (
      <div className="margin-bottom-8 margin-top-8 clearfix">
        <div className="fr">
          <Button type="primary" onClick={handleAdd}>
            添加
          </Button>
        </div>
      </div>
    );
  };

  const generateTable = () => {
    const tableProps = {
      rowKey: "id",
      onRef: (e) => (agGridEditTableRef.current = e),
      dataSource: dataSource || [],
      loading,
      height: 200,
      fieldMode: "edit",
      domLayout: "autoHeight",
      tipMode: "tooltip",
      columns: (columns || []).concat(operateColumn),
      onGridReady,
      fieldDefaultConfig: {
        size: "default",
      },
    };
    return <AgGridEditTable {...tableProps} />;
  };

  const generateModifyModal = () => {
    const modifyProps = {
      ref: modifyModalRef,
      api,
      formList,
      onOk: fetchList,
      onEvent,
    };
    return <ModifyModal {...modifyProps} />;
  };

  return (
    <div className="common-view-wrapper">
      {generateToolbar()}
      {generateTable()}
      {generateModifyModal()}
    </div>
  );
};

export default ConmonView;
