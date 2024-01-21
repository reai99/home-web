import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import { Spin } from "antd";
import _ from 'lodash';
import CellRender from "./CellRender";
import "ag-grid-community/styles/ag-grid.css";
import "./index.less";

export default class AgGridEditTable extends Component {

  cachaStageDataMap = {};

  componentDidMount() {
    const { onRef } = this.props;
    onRef && onRef(this)
  }

  get columns() {
    const { columns } = this.props;
    return (columns || []).map((v) => {
      const column = {
        resizable: true,
        ...v,
        field: v.dataIndex,
        headerComponent: () => v.title || "",
        pinned: v.fixed,
        width: typeof v.width === 'number' ? v.width + 10 : v.width,
      };
      if (v.editConfig) {
        column.cellRenderer = (params) => {
          const { value, data, rowIndex } = params || {};
          return this.generateCellRender(column, value, data, rowIndex);
        };
      } else if (v.render) {
        column.cellRenderer = (params) => {
          const { value, data, rowIndex } = params || {};
          return v.render(value, data, rowIndex);
        };
      }
      return column;
    });
  }

  getDataSource = (mode = 'all') => {
    const { dataSource, rowKey } = this.props;
    switch(mode) {
      case 'all' :
        return _.cloneDeep(dataSource).map(v => ({...v, ...this.cachaStageDataMap[v[rowKey]]}));
      case 'change': 
        return _.transform(this.cachaStageDataMap, (res, val, key)=> res.push({ ...val, [rowKey]: key }), [])
      default: 
        return _.cloneDeep(dataSource).map(v => ({...v, ...this.cachaStageDataMap[v[rowKey]]}));
    }
  }

  handleFieldChange = (changedField, record, column) => {
    const { rowKey, handleFieldChange } = this.props;
    const { value } = changedField;
    const rowKeyValue = record[rowKey];
    const fieldName = column.dataIndex || column.key || column.id;
    if(!this.cachaStageDataMap[rowKeyValue]) this.cachaStageDataMap[rowKeyValue] = {};
    this.cachaStageDataMap[rowKeyValue][fieldName] = value;
    handleFieldChange && handleFieldChange(changedField, record, column);
  }

  generateTitle = (title, isRequired) => {
    return isRequired === "1" ? (<span> {title}<mark>*</mark></span>) : title;
  };

  generateCellRender = (column, value, record, rowIndex) => {
    const { rowKey, editKey, fieldMode, tipMode, fieldDefaultConfig } = this.props;

    const props = {
      rowKey,
      editKey,
      column,
      record,
      value,
      rowIndex,
      fieldMode,
      tipMode,
      defaultConfig: fieldDefaultConfig,
      onFieldChange: (changeField) => this.handleFieldChange(changeField, record, column),
    };

    return <CellRender {...props} />;
  };

  generateTable = () => {
    const {
      dataSource = [],
      headerHeight,
      rowHeight,
      ...extraParams
    } = this.props;
    const props = {
      headerHeight: headerHeight || 32,
      rowHeight: rowHeight || 32,
      rowData: dataSource,
      columnDefs: this.columns,
      ...extraParams
    };
    return <AgGridReact {...props} />;
  };

  render() {
    const { height, loading } = this.props;
    return (
      <Spin tip="加载中..." spinning={loading}>
        <div style={{ width: "100%", height: height || "100%" }}>
          <div className="edit-ag-grid-container">
            <div
              style={{ width: "100%", height: "100%" }}
              className="ag-theme-alpine"
            >
              {this.generateTable()}
            </div>
          </div>
        </div>
      </Spin>
    );
  }
}
