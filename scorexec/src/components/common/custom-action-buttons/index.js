import CustomButton from "../custom-button";
//import { useNavigate } from "react-router-dom"

const CustomActionButton = ({
  title1="Add",
  title2="Cancel",
  handleClickBack,
  handleSubmit,
}) => {
  return (
    <>
      {/* <CustomButton onClick={useNavigate}>{""}
        </CustomButton> */}
      <CustomButton type="submit" onClick={handleSubmit}>
        {title1}
      </CustomButton>
      <CustomButton onClick={handleClickBack}>{title2}</CustomButton>
    </>
  );
};
export default CustomActionButton;
