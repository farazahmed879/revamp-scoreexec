import React, { useState } from "react";
import { Link } from "react-router-dom";
//import AddOrEditTenantForm from "../Custom-Tenants/index-Form";
import CustomButton from "../../../components/common/custom-button";
import CustomGrid from "../../../components/common/custom-grid";
import CustomSpace from "../../../components/common/custom-space";
import CustomTag from "../../../components/common/custom-tag";

const Role = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <CustomTag color={color} key={tag}>
                {tag.toUpperCase()}
              </CustomTag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <CustomSpace size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </CustomSpace>
      ),
    },
  ];
  
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    }
  ];

  return (
    <>
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
      <Link to="/create-role">
        <CustomButton onClick={toggleForm}>Add</CustomButton>
        </Link>
      </div>
      <CustomGrid columns={columns} data={data} />
    </>
  );
};

export default Role;
