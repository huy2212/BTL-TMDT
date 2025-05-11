import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow ,Box} from '@mui/material'
import React, { useEffect } from 'react'
import CollapseRow from './CollapseRow'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from '../../../redux/reducer/ProductSlice'

const CategoryCollapseTable = ({setDisplayAddCategory}) => {
    const dispatch = useDispatch()
    const categories = useSelector((state)=> state.category.categories)
    return (
        <Box mt={4}>
            <TableContainer component={Paper}>
                <Table aria-label='collapsible table' size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell align='center'>Id</TableCell>
                            <TableCell align='center'>Tên danh mục</TableCell>
                            <TableCell align='center'>Mã danh mục</TableCell>
                            <TableCell align='center'>Mô tả</TableCell>
                            <TableCell align='center'>Tác vụ</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            categories.map((row) => (
                                <CollapseRow key={row.id} row={row} category={row.id} variations={row.variations}  setDisplayAddCategory={setDisplayAddCategory} />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default CategoryCollapseTable