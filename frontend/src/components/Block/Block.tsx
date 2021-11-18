import { Row, RowProps } from "antd";
import React from "react";
import styles from "./Block.module.scss";

interface IProps extends RowProps {
  title: string;
  content: React.ReactNode;
}

const Block: React.FC<IProps> = ({ title, content, ...props }) => (
  <>
    <div className={styles.block_headline}>{title}</div>
    <Row {...props}>{content}</Row>
  </>
);

export default Block;
