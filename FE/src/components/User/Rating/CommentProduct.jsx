import React, { useState } from 'react'
import { Box, Button, IconButton, TextareaAutosize, Typography } from '@mui/material'
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ColorText from '../../Admin/ColorText'
import { FaStar } from "react-icons/fa";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import StarRating from './StarRating';
import { useDispatch } from 'react-redux';
import { addComment } from '../../../redux/reducer/ReviewSlice';
import { notify } from '../../Admin/notify';
export const CommentProduct = ({ setDisplayCommentProduct, ratingProduct }) => {
    const dispatch = useDispatch()
    const [currentStarRating, setCurrentStarRating] = useState(0)
    const [comment, setComment] = useState("")
    const handleComment =()=>{
        if(comment==="") {
            notify("Không được để trống nhận xét",3)
            return
        }
        const body = {
            content: comment
        }
        dispatch(addComment({id:ratingProduct.productId,comment:body}))
        setDisplayCommentProduct(false)
    }
    return (
        <Box style={styles.coverer} >
            <Box style={styles.confirmBox}>
                <Box style={{ display: 'flex', justifyContent: "flex-end" }}>
                    <IconButton
                        onClick={() => { setDisplayCommentProduct(false) }}
                    >
                        <CancelOutlinedIcon color='error' />
                    </IconButton>
                </Box>
                <Box style={styles.contentBox}>
                    <Typography variant='h6'>Thông tin sản phẩm</Typography>
                    <Box sx={styles.images} mt={2} >
                        {
                            ratingProduct.images.map((img, index) => {
                                return (
                                    <Box sx={styles.images.image} key={index} >
                                        <img src={img.path} alt={img.id} style={{ height: "100%" }} ></img>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                    <Box mt={3}>
                        <Box> <span className='font-medium'>Tên sản phẩm : </span>{ratingProduct.name}</Box>
                    </Box>
                    <Box mt={1}>
                        <Box> <span className='font-medium'>Lượt đánh giá : </span>{ratingProduct.number_rating} </Box>
                    </Box>
                    <Box mt={1}  >
                        <Box display="flex" alignItems="center"><span className='font-medium'>Sao hiện tại : </span> <span className='mx-1'>{ratingProduct.rating}</span><FaStar color="#ffa534" /></Box>
                    </Box>
                    <Typography variant='h6' mt={1}>Nhận xét sản phẩm</Typography>
                    <textarea value={comment} style={{ border: "1px solid gray", width: "100%", maxHeight: "100px", padding: "10px" }}
                        max
                        onChange={(e) => {
                            setComment(e.target.value)
                        }} >
                    </textarea>
                    <Box display="flex" justifyContent="flex-end" mt={1}>
                        <button
                            onClick={()=>handleComment()}
                            className='px-2 py-1 outline-none rounded-md text-[rgb(10_104_255)] border-[1px] border-[rgb(10_104_255)] hover:text-white hover:bg-[rgb(10_104_255)]'>
                            Gửi nhận xét
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
        width: "50%",
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
