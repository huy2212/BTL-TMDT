import React, { useState } from 'react'
import { Box, Button, IconButton, TextareaAutosize, Typography } from '@mui/material'
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ColorText from '../../Admin/ColorText'
import { FaStar } from "react-icons/fa";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import StarRating from './StarRating';
import { notify } from '../../Admin/notify';
import { addRating } from '../../../redux/reducer/ReviewSlice';
import { useDispatch } from 'react-redux';
export const RatingProduct = ({ setDisplayRatingProduct, ratingProduct }) => {
    const dispatch = useDispatch()
    const [currentStarRating, setCurrentStarRating] = useState(0)
    const handleRating =()=>{
        if(currentStarRating==="") {
            notify("Đánh giá phải trong khoảng 1 đến 5 sao",3)
            return
        }
        const body = {
            ranking: currentStarRating
        }
        dispatch(addRating({id:ratingProduct.productId,ranking:body}))
        setDisplayRatingProduct(false)
    }
    return (
        <Box style={styles.coverer} >
            <Box style={styles.confirmBox}>
                <Box style={{ display: 'flex', justifyContent: "flex-end" }}>
                    <IconButton
                        onClick={() => { setDisplayRatingProduct(false) }}
                    >
                        <CancelOutlinedIcon color='error' />
                    </IconButton>
                </Box>
                <Box style={styles.contentBox}>
                    <Typography variant='h6' >Đánh giá sản phẩm</Typography>
                    <StarRating setCurrentStarRating={setCurrentStarRating} />
                    <Box display="flex" justifyContent="center" mt={1}>
                        <button
                            onClick={()=> handleRating()}
                            className='px-2 py-1 outline-none rounded-md text-[#ffa500] border-[1px] border-[#ffa500] hover:text-white hover:bg-[#ffa500]'>
                            Gửi đánh giá
                        </button>
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
        // width: "50%",
        position: 'absolute',
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        boxShadow: " rgb(169 169 169) 0px 9px 30px 0px",
        pt: "10px",
        borderRadius: "10px"
    },
    contentBox: {
        padding: "30px",
        paddingTop: '10px',
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
        text: {
            padding: "0 10%"
        },
        noButton: {
            background: "white",
            color: "black",
            py: 1,
            width: "45%",
            '&:hover': {
                backgroundColor: '#e8e8e8',
                color: 'black',
            },
        },
        yesButton: {
            background: "red",
            color: "white",
            py: 1,
            width: "45%",
            '&:hover': {
                backgroundColor: '#cc0000',
                color: 'white',
            },
        }
    },
    images: {
        width: "100%",
        height: "auto",
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        maxHeight: "200px",
        overflowY: "auto",
        image: {
            width: "20%",
            marginRight: "10px",
            // height: "100px",
            // maxHeight: "100px",
            position: "relative",
            delete: {
                position: 'absolute',
                top: "-2px",
                right: "2px",
                cursor: "pointer",
                color: "red",
                backgroundColor: "white"

            }
        }

    }
}
