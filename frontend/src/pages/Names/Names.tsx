import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Button, Table } from "antd";
import { namesStore } from "stores";
import NameModel from "stores/NameStore/NameModel";
import styles from "./Names.module.scss";
import NameCard from "./NameCard/NameCard";

const Names = () => {
  useEffect(() => {
    namesStore.getAllNames();
  }, []);

  const onOpenNameCard = (record: NameModel) => {
    if (record.id !== null) namesStore.openNameCard(record.id);
  };

  const onOpenNewNameCard = () => {
    namesStore.openNameCard();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: NameModel) => (
        <a onClick={() => onOpenNameCard(record)}>{text}</a>
      ),
    },
    {
      title: "Birth year",
      dataIndex: "birthYear",
      key: "birthYear",
    },
    {
      title: (
        <div className={styles.addButtonWrapper}>
          <span>Death year</span>{" "}
          <Button type={"primary"} onClick={onOpenNewNameCard}>
            Add name
          </Button>
        </div>
      ),
      dataIndex: "deathYear",
      key: "deathYear",
      render: (deathYear: string | null) =>
        deathYear === null ? "" : deathYear,
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={namesStore.names}
        loading={namesStore.isFetching}
      />
      <NameCard />
    </>
  );
};

export default observer(Names);
