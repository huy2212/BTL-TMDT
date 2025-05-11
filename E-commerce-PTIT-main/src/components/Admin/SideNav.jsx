import { Avatar, Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PaymentIcon from '@mui/icons-material/Payment';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { Link, useLocation } from 'react-router-dom';
import avatar from '../../assets/avatar.jpg'
function SideNav(props) {
    const theme = useTheme();
    const { sideNavExpanded } = props
    const location = useLocation()
    const user = JSON.parse(localStorage.getItem("authorization"))
    return (
        <Sidebar
            style={{
                height: "100%",
                top: 'auto'
            }}
            breakPoint='md'
            backgroundColor={theme.palette.neutral.light}
            collapsed={!sideNavExpanded}

        >
            <Box sx={style.avatarContainer} >
                <Avatar sx={style.avatar} alt='Channel Name' src={avatar} ></Avatar>
                {sideNavExpanded ? <Typography variant='body2' sx={style.yourChannel} > Your Channel</Typography> : null}
                {sideNavExpanded ? <Typography variant='overline' >React</Typography> : null}
            </Box>
            <Menu
                menuItemStyles={{
                    button: ({ active }) => {
                        return {
                            backgroundColor: active ? theme.palette.neutral.medium : undefined
                        }
                    }
                }}

            >
                {
                    user.role === "ADMIN" ? (
                        <>
                            <MenuItem active={location.pathname === '/admin/'} component={<Link to={'/admin/'} />} icon={<DashboardOutlinedIcon />}>
                                <Typography variant='body2'>Dashboard</Typography>
                            </MenuItem>
                            <MenuItem active={location.pathname === '/admin/bill'} component={<Link to={'/admin/bill'} />} icon={<PaymentIcon />}>
                                <Typography variant='body2'>Bill</Typography>
                            </MenuItem>
                            <MenuItem active={location.pathname === '/admin/productmanager'} component={<Link to={'/admin/productmanager'} />} icon={<Inventory2OutlinedIcon />}>
                                <Typography variant='body2'>Product</Typography>
                            </MenuItem>
                            <MenuItem active={location.pathname === '/admin/promotion'} component={<Link to={'/admin/promotion'} />} icon={<LoyaltyOutlinedIcon />}>
                                <Typography variant='body2'>Promotion</Typography>
                            </MenuItem>
                            <MenuItem active={location.pathname === '/admin/usermanager'} component={<Link to={'/admin/usermanager'} />} icon={<PersonOutlineOutlinedIcon />}>
                                <Typography variant='body2'> User</Typography>
                            </MenuItem>
                            <MenuItem active={location.pathname === '/admin/voucher'} component={<Link to={'/admin/voucher'} />} icon={<StyleOutlinedIcon />}>
                                <Typography variant='body2'> Voucher</Typography>
                            </MenuItem>
                            <MenuItem active={location.pathname === '/admin/category'} component={<Link to={'/admin/category'} />} icon={<CategoryOutlinedIcon />}>
                                <Typography variant='body2'>Category</Typography>
                            </MenuItem>
                            <MenuItem active={location.pathname === '/admin/supplier'} component={<Link to={'/admin/supplier'} />} icon={<LocalShippingOutlinedIcon />}>
                                <Typography variant='body2'>Supplier</Typography>
                            </MenuItem>
                        </>
                    ) : (
                        <>
                            <MenuItem active={location.pathname === '/employee/'} component={<Link to={'/employee/'} />} icon={<DashboardOutlinedIcon />}>
                                <Typography variant='body2'>Hóa đơn</Typography>
                            </MenuItem>
                            <MenuItem active={location.pathname === '/employee/import'} component={<Link to={'/employee/import'} />} icon={<PaymentIcon />}>
                                <Typography variant='body2'>Nhập hàng</Typography>
                            </MenuItem>
                        </>
                    )
                }
            </Menu>
        </Sidebar>
    )
}
/**  @type {import("@mui/material").SxProps} */
const style = {
    avatarContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        my: 5
    },
    avatar: {
        width: "50%",
        height: "auto"
    },
    yourChannel: {
        mt: 1
    }
}
export default SideNav