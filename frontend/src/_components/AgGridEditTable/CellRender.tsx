// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { Component } from "react";
import { DynamicFieldRender } from "antd-dynamic-form-render";

export default class CellRender extends Component {
  getTagKey = () => {
    const { record, rowKey } = this.props;
    return record[rowKey];
  };

  getFieldName = () => {
    const { column } = this.props;
    return column.dataIndex || column.key || column.id;
  };

  getMode = (editConfig) => {
    const { fieldMode } = this.props;
    const { mode } = editConfig;
    return mode || fieldMode;
  };

  getTipMode = (editConfig) => {
    const { tipMode } = this.props;
    const { tipType } = editConfig;
    return tipMode || tipType;
  };

  getFormFieldId = () => {
    return this.getTagKey() + "_" + this.getFieldName();
  };

  getFieldsRuleValidate = (editConfig, rules) => {
    const { column, onFieldValidateRule } = this.props;

    const { title } = column;
    const { isRequired } = editConfig;

    const newRules = [];
    if (rules && rules.length > 0) {
      newRules.push(...rules);
    }
    if (isRequired === "1" && !newRules.find((v) => v.required)) {
      newRules.push({ required: true, message: `${title}字段必填` });
    }

    if (newRules.length) {
      onFieldValidateRule &&
        onFieldValidateRule(this.getTagKey(), this.getFieldName(), rules);
    }
  };

  formatRuleConfig = (rules, record) => {
    return typeof rules === "function" ? rules(record) : rules;
  };

  formatEditConfig = (editConfig, value, record, rowIndex) => {
    return typeof editConfig === "function"
      ? editConfig.call(this, value, record, rowIndex)
      : editConfig || {};
  };

  generateCell = () => {
    const { column, record, value, rowIndex, onFieldChange, defaultConfig } = this.props;

    const editConfig = this.formatEditConfig(
      column.editConfig,
      value,
      record,
      rowIndex
    );

    const rules = this.formatRuleConfig(editConfig.rules, record);

    this.getFieldsRuleValidate(editConfig, rules);

    const props = {
      size: "default",
      ...defaultConfig,
      style: { width: "100%" },
      ...editConfig,
      value, 
      bordered: false,
      id: this.getFormFieldId(),
      rules,
      errorTipConfig: {},
      tipType: this.getTipMode(editConfig),
      mode: this.getMode(editConfig),
      onFieldChange: onFieldChange || editConfig.onFieldChange,
    };

    return <DynamicFieldRender {...props} />;
  };

  render() {
    return (
      <div ref={e => this.cellFieldRef = e} className="dynamic-table-cell-field">{this.generateCell()}</div>
    );
  }
}
