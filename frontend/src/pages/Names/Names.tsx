import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Table } from "antd";
import { namesStore } from "stores";

const Names = () => {
  useEffect(() => {
    namesStore.getAllNames();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Birth year",
      dataIndex: "birthYear",
      key: "birthYear",
    },
    {
      title: "Death year",
      dataIndex: "deathYear",
      key: "deathYear",
      render: (deathYear: string | null) =>
        deathYear === null ? "" : deathYear,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={namesStore.names}
      loading={namesStore.isFetching}
    />
  );
};

export default observer(Names);
