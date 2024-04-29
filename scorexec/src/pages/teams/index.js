import React , { useState }from "react";
import { Link } from "react-router-dom";
import CustomButton from "../../components/common/custom-button";
import CustomGrid from "../../components/common/custom-grid";
import CustomSpace from "../../components/common/custom-space";
import CustomTag from "../../components/common/custom-tag";
const Team = () => {
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
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  return <>
  <div style={{ textAlign: "right", marginBottom: "10px" }}>
  <Link to="/create-team">
    <CustomButton onClick={toggleForm}>Add</CustomButton> 
    </Link>
  </div>
  <CustomGrid columns={columns} data={data} />
</>
};
export default Team
