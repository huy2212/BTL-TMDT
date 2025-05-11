import { Box, Button } from '@mui/material'
import React from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ColorText from './ColorText';
export const Confirm = (props) => {
    const {name,yesAction,noAction} = props
    return (
        <Box style={styles.coverer} >
            <Box style={styles.confirmBox}>
                <Box mt={7} mb={2} display={'flex'} justifyContent={"center"}>
                    <DeleteOutlineOutlinedIcon fontSize='large' sx={{color:"red"}} />
                </Box>
                <ColorText color={"red"} children={`DELETE ${name} !`} fontSize={"18px"} textAlign={"center"} />
                <Box mt={7} style ={styles.contentBox} >
                    <Box style={styles.contentBox.text}>
                        <Box  textAlign={"center"}>Thay đổi này sẽ được thực hiện vĩnh viễn, vui lòng suy nghĩ kỹ trước khi xác nhận</Box>
                        <Box mt={2} display={"flex"} justifyContent={"space-between"}>
                            <Button variant='contained' 
                            sx={styles.contentBox.noButton}
                            onClick={()=> noAction()}
                            >No, keep it</Button>
                            <Button variant='contained' sx={styles.contentBox.yesButton}
                            onClick={()=> yesAction()}
                            >Yes, delete it</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
/**  @type {import("@mui/material").SxProps} */
const styles = {
    coverer: {
        position: "fixed",
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1112,
        background: "rgba(0,0,0,0.5)"
    },
    confirmBox: {
        backgroundColor: "white",
        width: "40%",
        position: 'absolute',
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        boxShadow:" rgb(169 169 169) 0px 9px 30px 0px",
        pt:"10px",
        borderRadius:"10px"
    },
    contentBox:{
        background:"#f8f8f8",
        padding:"30px",
        borderBottomLeftRadius:"10px",
        borderBottomRightRadius:"10px",
        text:{
            padding:"0 10%"
        },
        noButton:{
            background:"white",
            color:"black",
            py:1,
            width:"45%",
            '&:hover': {
                backgroundColor: '#e8e8e8',
                color: 'black',
            },
        },
        yesButton:{
            background:"red",
            color:"white",
            py:1,
            width:"45%",
            '&:hover': {
                backgroundColor: '#cc0000',
                color: 'white',
            },
        }
    }
}
