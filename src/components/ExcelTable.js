import React, { Component } from "react";
import { Table, Button, Upload } from "antd";
import { ExcelRenderer } from "react-excel-renderer";

export default class ExcelPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {rows, columns} = this.props;
    return (
      <div style={{ marginTop: 20 }}>
        <Table
          dataSource={rows}
          columns={columns}
          pagination={{ pageSize: 50 }} 
          scroll={{y: 400 }}
        />
      </div>
    );
  }
}
