import { Button } from "antd"

const CustomButton = (prop) => {
    return <Button bordered={false} style={{ margin: 5 }} {...prop}></Button>
}
export default CustomButton


// const buttonStyle = {
//     margin: 5,
//     backgroundColor: props.color || "transparent",
//   };