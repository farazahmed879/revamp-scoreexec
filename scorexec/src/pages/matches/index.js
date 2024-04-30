import React, {useState} from "react";
import { Link } from "react-router-dom";
import CustomButton from "../../components/common/custom-button";
import CustomGrid from "../../components/common/custom-grid";
import CustomSpace from "../../components/common/custom-space";
//import CustomTag from "../../components/common/custom-tag";

const Matches = () => {
    const [showForm, setShowForm] = useState(false); //show or no show form

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const columns = [
    {
      title: "Ground",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
        title: "Team 1",
        dataIndex: "team1name",
        key: "team1name",
      },
      {
        title: "Team 2",
        dataIndex: "team2name",
        key: "team2name",
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
          name: "Gymkhana",
          team1name: "Gulzar CC",
          team2name: "Pak Shaheen CC",
        },
    ];
    return (
        <>
          <div style={{ textAlign: "right", marginBottom: "10px" }}>
          <Link to="/create-match">
            <CustomButton onClick={toggleForm}>Add New Match</CustomButton> 
            </Link>
          </div>
          <CustomGrid columns={columns} data={data} />
        </>
      );
    };

    export default Matches;