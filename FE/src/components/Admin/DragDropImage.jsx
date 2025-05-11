import { Box } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

export default function DragDropImage({ setAddImages,initImages }) {
    const [images, setImages] = useState([])
    const [isDraging, setIsDraging] = useState(false)
    const fileInputRef = useRef(null)
    useEffect(()=>{
        if(initImages) {
            let tmpImg = []
            if(typeof initImages !=="string"){
                initImages.map((img)=>{
                    tmpImg.push({
                        id: img.id,
                        url: img.path
                    })
                })
            }
            else {
                tmpImg.push({
                    name: initImages.split('/').at(-1),
                    url: initImages
                })
            }
            setImages(tmpImg)
            setAddImages(tmpImg)
        }
    },[initImages])
    const selectFiles = () => {
        fileInputRef.current.click()
    }
    const onFilesSelect = (event) => {
        let imageAdded = [...images]
        const files = event.target.files
        if (files.length == 0) return;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split('/')[0] !== 'image') continue;
            if (!images.some((e) => e.name === files[i].name)) {
                console.log(files[i].name)
                setImages((prevImages) => [
                    ...prevImages,
                    {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i])
                    }
                ])
                imageAdded.push({
                    name: files[i].name,
                    url: URL.createObjectURL(files[i])
                })
            }
        }
        setAddImages(imageAdded)
    }
    const handleDeleteImg = (index) => {
        let imageAdded = [...images]
        setImages((prevImages) =>
            prevImages.filter((_, i) => i !== index)
        )
        imageAdded = imageAdded.filter((_, i) => i !== index)
        setAddImages(imageAdded)
    }
    return (
        <Box>
            <Box sx={style.dropImgArea}>
                {isDraging ? (
                    <Box sx={style.selectSpan} >Drop images here or {" "}</Box> 
                ) : (   
                    <>
                        Drag & Drop image here
                        <Box sx={style.selectSpan} onClick={selectFiles} >Browse</Box>
                    </>
                )}
                <input style={{ display: "none", height: "100%", width: "100%" }} name='file' type='file' multiple ref={fileInputRef} onChange={onFilesSelect}></input>


            </Box>
            <Box sx={style.container} >
                {
                    images.map((img, index) => {
                        return (
                            <Box sx={style.container.image} key={index} >
                                <Box sx={style.container.image.delete} onClick={() => handleDeleteImg(index)}>x</Box>
                                <img src={img.url} alt={img.name} style={{ height: "100%" }} ></img>
                            </Box>
                        )
                    })
                }
            </Box>

        </Box>
    )

}
/** @type {import("@mui/material").SxProps} */
const style = {
    dropImgArea: {
        height: "150px",
        border: "3px #007fff dashed",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#0086fe",
        backgroundColor: "#f4f3f9",
        WebkitUserSelect: "none"
    },
    selectSpan: {
        color: "#5256ad",
        marginLeft: "5px",
        cursor: "pointer",
        transition: "0.4s",
        ":hover": {
            opacity: "0.6"
        }
    },
    container: {
        width: "100%",
        height: "auto",
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        maxHeight: "200px",
        overflowY: "auto",
        marginTop: "10px",
        image: {
            width: "auto",
            marginRight: "10px",
            height: "75px",
            maxHeight: "75px",
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

