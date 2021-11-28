import React from "react";
import { observer } from "mobx-react";
import { Button, Col, Divider, Select } from "antd";
import Block from "components/Block";
import styles from "./DataBaseControlMenu.module.scss";

const DataBaseControlMenu = () => {
  return (
    <div className={styles.layout}>
      <Block
        title={"Add menu"}
        content={
          <>
            <Col span={12}>
              <Button>Add new Movie</Button>
            </Col>
            <Col span={12}>
              <Button>Add new Name</Button>
            </Col>
          </>
        }
      />
      <Divider />
      <Block
        title={"Import menu"}
        gutter={[0, 8]}
        content={
          <>
            <Col span={12} className={styles.rowText}>
              Select file format
            </Col>
            <Col span={12}>
              <Select defaultValue=".csv">
                <Select.Option value=".csv">.csv</Select.Option>
                <Select.Option value=".xml">.xml</Select.Option>
                <Select.Option value=".xlsx">.xlsx</Select.Option>
              </Select>
            </Col>
            <Col span={12}>
              <Button>Select movies file</Button>
            </Col>
            <Col span={12}>
              <Button>Select names file</Button>
            </Col>
          </>
        }
      />
      <Divider />
      <Block
        title={"Export menu"}
        gutter={[0, 8]}
        content={
          <>
            <Col span={12} className={styles.rowText}>
              Select file format
            </Col>
            <Col span={12}>
              <Select defaultValue=".csv">
                <Select.Option value=".csv">.csv</Select.Option>
                <Select.Option value=".xml">.xml</Select.Option>
                <Select.Option value=".xlsx">.xlsx</Select.Option>
              </Select>
            </Col>
            <Col span={12}>
              <Button>Export movies</Button>
            </Col>
            <Col span={12}>
              <Button>Export names</Button>
            </Col>
          </>
        }
      />
    </div>
  );
};

export default observer(DataBaseControlMenu);
