import React, { Component } from "react";
import { Tabs } from 'antd';
import ExcelPage from './components/ExcelTable';
import MailPage from './components/MailTemplate';
import { ExcelRenderer } from "react-excel-renderer";
import { Button, Upload } from "antd";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: [],
      rows: [],
      errorMessage: null,
      columns: []
    };
	}
	
	checkFile(file) {
    let errorMessage = "";
    if (!file || !file[0]) {
      return;
    }
    const isExcel =
      file[0].type === "application/vnd.ms-excel" ||
      file[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (!isExcel) {
      errorMessage = "You can only upload Excel file!";
    }
    console.log("file", file[0].type);
    const isLt2M = file[0].size / 1024 / 1024 < 2;
    if (!isLt2M) {
      errorMessage = "File must be smaller than 2MB!";
    }
    console.log("errorMessage", errorMessage);
    return errorMessage;
  }

  fileHandler = fileList => {
    console.log("fileList", fileList);
    let fileObj = fileList;
    if (!fileObj) {
      this.setState({
        errorMessage: "No file uploaded!"
      });
      return false;
    }
    console.log("fileObj.type:", fileObj.type);
    if (
      !(
        fileObj.type === "application/vnd.ms-excel" ||
        fileObj.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      this.setState({
        errorMessage: "Unknown file format. Only Excel files are uploaded!"
      });
      return false;
    }
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        let newRows = [];
        let tableColumns = [];
        if(resp.rows && resp.rows.length>0) {
          for(let i = 0; i<resp.rows[0].length; i++) {
            let column = {
              title: resp.rows[0][i],
							dataIndex: resp.rows[1][i],
            }
            tableColumns.push(column);
          }
        }
        if (tableColumns.length > 0) {
          this.setState({
            columns: tableColumns,
          })
        }
        
        resp.rows.slice(2).map((row, index) => {
          if (row && row !== "undefined") {
            let data = { key: index };
            for(let i=0; i < row.length; i++) {
              data[tableColumns[i].dataIndex] = row[i];
            }
            newRows.push(data);
          }
        });
        if (newRows.length === 0) {
          this.setState({
            errorMessage: "No data found in file!"
          });
          return false;
        } else {
          this.setState({
            cols: resp.cols,
            rows: newRows,
            errorMessage: null
          });
        }
      }
    });
    return false;
  };
	
	callback(key) {
		console.log(key);
	}

  render() {
		const columns = this.state.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          title: col.title,
        })
      };
		});	
		const { TabPane } = Tabs;

    return (
			<Tabs onChange={this.callback} type="card">
				<TabPane tab="Import excel data" key="1">
					<div className="excel-table">
						<h1>Importing data</h1>
						<div>
							<Upload
								name="file"
								beforeUpload={this.fileHandler}
								onRemove={() => this.setState({ rows: [] })}
								multiple={false}
								showUploadList={false}
							>
								<Button> Click to Upload Excel File
								</Button>
							</Upload>
						</div>
					</div>
					<ExcelPage columns={columns ? columns : []} rows={this.state.rows}/>
				</TabPane>
				<TabPane tab="Mail template" key="2">
					<MailPage />
				</TabPane>
			</Tabs>
    );
  }
}
