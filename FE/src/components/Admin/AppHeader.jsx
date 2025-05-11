import { AppBar, Badge, Box, IconButton, Toolbar } from '@mui/material'
import React, { useEffect, useState } from "react";
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../../assets/logo.png';
import mqtt from "mqtt";
import HeaderNotification from '../Layout/Header/HeaderNotification';
import { useDispatch } from 'react-redux';
import { fetchOrder } from '../../redux/reducer/OrderSlice';

function AppHeader(props) {
    const dispatch = useDispatch()
    //------------------------------Begin: Notification test-----------------------------------
    const [client, setClient] = useState(null);
    const [notiQuantity, setNotiQuantity] = useState(0);
    const role = JSON.parse(localStorage.getItem("authorization"));
    const [displayNotify, setDisplayNotify] = useState(false)
    const mqttConnect = (url, options) => {
        console.log(options.username);
        setClient(mqtt.connect(url, options));
    };

    useEffect(() => {
        const url = `ws://192.168.211.122:8083/mqtt`;
        const options = {
            username: "test_mqtt1_" + role.role,
            password: "1234",
            clean: true,
            reconnectPeriod: 1000, // ms
            connectTimeout: 30 * 1000, // ms
        };
        mqttConnect(url, options)
    }, [])

    useEffect(() => {
        // connect
        if (client) {
            client.on("connect", () => {
                // setConnectStatus("Connected");
                console.log("connection successful");
                // setConnectSuccess(true);
                mqttSub(client);
            });
            client.on("error", (err) => {
                console.error("Connection error: ", err);
                client.end();
            });
            client.on("reconnect", () => {
                // setConnectStatus("Reconnecting");
            });
            client.on("message", (topic, message) => {
                const payload = { topic, message: message.toString() };
                setNotiQuantity(payload.message);
                dispatch(fetchOrder())
            });
        }
    }, [client]);
    // đăng ký nhận tin nhắn từ topic
    const onFinish = () => {
        const url = `ws://localhost:8083/mqtt`;
        const options = {
            username: "test_mqtt1_" + role.role,
            password: "Tronghuong2002@",
            clean: true,
            reconnectPeriod: 1000, // ms
            connectTimeout: 30 * 1000, // ms
        };
        mqttConnect(url, options);
        // mqttSub()
    };
    const mqttSub = (client) => {
        if (client) {
            client.subscribe("order", 2, (error) => {
                if (error) {
                    console.log("Subscribe to topics error", error);
                    return;
                }
                console.log("Đã đăng ký tới topic order");
                // setIsSub(true);
            });
        }
    };

    // mqttConnect(url, options)
    // mqttSub()
    //------------------------------End: Notification test-----------------------------------

    const handleLogout = () => {
        localStorage.removeItem("authorization")
        window.location.href = "/login"
    }
    const { sideNavExpanded, setSideNavExpanded } = props
    return (
        <AppBar position='sticky' sx={style.appBar}>
            <Toolbar>
                <IconButton onClick={() => sideNavExpanded ? setSideNavExpanded(false) : setSideNavExpanded(true)} color='secondary'>
                    <MenuTwoToneIcon></MenuTwoToneIcon>
                </IconButton>
                <Box
                    component='img'
                    sx={style.appLogo}
                    src={logo} />
                <Box sx={{ flexGrow: 1 }} />
                <IconButton title='Notification' color='secondary'
                    onClick={() => setDisplayNotify(!displayNotify)}
                    sx={{ position: "relative" }}>
                    <Badge badgeContent={notiQuantity} color='error'>
                        <NotificationsIcon />
                    </Badge>
                    {displayNotify && <div className='absolute bottom-2 text-[black] text-sm text-left'>
                        <HeaderNotification />
                    </div>}
                </IconButton>
                <IconButton title='Setting' color='secondary'>
                    <SettingsIcon />
                </IconButton>
                <IconButton onClick={handleLogout} title='Logout' color='secondary'>
                    <LogoutIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
/**  @type {import("@mui/material").SxProps} */
const style = {
    appBar: {
        bgcolor: 'neutral.main'
    },
    appLogo: {
        borderRadius: 2,
        width: 50,
        ml: 2,
        cursor: 'pointer'
    }
}
export default AppHeader