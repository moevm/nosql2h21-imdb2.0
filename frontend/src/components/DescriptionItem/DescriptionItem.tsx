import React from "react";
import styles from "./DescriptionItem.module.scss";

interface IProps {
  title: string;
  content: React.ReactNode;
}

const DescriptionItem: React.FC<IProps> = ({ title, content }) => (
  <div className={styles.descriptionItem}>
    <span>{title}:</span>
    {content}
  </div>
);

export default DescriptionItem;
