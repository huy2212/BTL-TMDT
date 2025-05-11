import { Box, Card, Divider, Grid, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ColorText from '../../components/Admin/ColorText'
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import CrisisAlertOutlinedIcon from '@mui/icons-material/CrisisAlertOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import StatisticChart from '../../components/Admin/Dashboard/StatisticChart';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import RankProduct from '../../components/Admin/Dashboard/RankProduct';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatisticInMonth, fetchStatisticYear, getTop10BestSeller } from '../../redux/reducer/StatisticSlice';
import { formatCurrency, formatNumberWithDots } from '../../components/basicFunction';
function Dashboard() {
    const dispatch = useDispatch()

    const getLast12Months = () => {
        const months = [];
        const now = new Date();
        for (let i = 0; i < 12; i++) {
            const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);

            const year = monthStart.getFullYear();
            const month = (monthStart.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits for month
            const startDay = monthStart.getDate().toString().padStart(2, '0'); // Ensure two digits for day
            const endDay = monthEnd.getDate().toString().padStart(2, '0'); // Ensure two digits for day

            months.push({
                month: `${month}/${year}`,
                value: {
                    start: `${year}-${month}-${startDay}`,
                    end: `${year}-${month}-${endDay}`
                }
            });
        }
        return months.reverse();
    }
    function getLast5Years() {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = 0; i < 5; i++) {
            years.push(currentYear - i);
        }
        return years;
    }
    const [selectedMonth, setSelectedMonth] = useState(getLast12Months().at(-1).month)
    const [selectedYear, setSelectedYear] = useState(getLast5Years().at(0))
    const statisticNumber = useSelector(state => state.statistic.statisticNumber)
    const statisticYear = useSelector(state=> state.statistic.statisticYear)
    const top10 = useSelector(state => state.statistic.top10BestSeller)
    useEffect(() => {
        const valueDateMonth = getLast12Months().find((item) => item.month == selectedMonth)?.value
        if (valueDateMonth) dispatch(fetchStatisticInMonth(valueDateMonth))
    }, [selectedMonth])
    useEffect(() => {
        if (selectedYear) dispatch(fetchStatisticYear(selectedYear))
    }, [selectedYear])
    useEffect(() => {
        dispatch(getTop10BestSeller())
    }, [])
    const CustomSelect = styled(Select)(({ theme }) => ({
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },
        '& .MuiSelect-select': {
            padding: '8px',
            backgroundColor: 'transparent',
            fontSize: "large"
        },
    }));
    return (
        <Box>
            <Typography sx={style.pageTitle} variant='h5'>
                Thống kê trong tháng
                <CustomSelect value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} >
                    {getLast12Months().map((month) => {
                        return (<MenuItem value={month.month} >{month.month}</MenuItem>)
                    })}
                </CustomSelect>
            </Typography>
            <Box sx={{ marginBottom: "50px" }} >
                <Grid container rowSpacing={5} columnSpacing={5}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={style.item}>
                            <Box sx={{ backgroundColor: "#2D9596" }}>
                                <Box sx={style.item.cardTitle}>
                                    <ShoppingBasketOutlinedIcon />
                                    <Box sx={style.item.cardTitle.text} >Đã bán</Box>
                                </Box>
                            </Box>
                            <Box sx={style.item.cardNumber}>
                                <ColorText color="#2D9596" children={formatNumberWithDots(statisticNumber?.quantitySold)} />
                            </Box>
                            <Divider />
                            <Box sx={style.item.statistic}>
                                <Box sx={style.item.statistic.container} >
                                    <CrisisAlertOutlinedIcon />
                                    <Box sx={style.item.statistic.container.number} >
                                        <ArrowUpwardOutlinedIcon fontSize='small' />
                                        <ColorText color="#2D9596" children={"5%"} />
                                    </Box>
                                </Box>
                                <Box sx={style.item.statistic.container} >
                                    <CalendarMonthOutlinedIcon />
                                    <Box sx={style.item.statistic.container.number} >
                                        <ArrowUpwardOutlinedIcon fontSize='small' />
                                        <ColorText color="#2D9596" children={"5%"} />
                                    </Box>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={style.item}>
                            <Box sx={{ backgroundColor: "#2D9596" }}>
                                <Box sx={style.item.cardTitle}>
                                    <LocalAtmOutlinedIcon />
                                    <Box sx={style.item.cardTitle.text} >Doanh thu</Box>
                                </Box>
                            </Box>
                            <Box sx={style.item.cardNumber}>
                                <ColorText color="#2D9596" children={formatCurrency(statisticNumber?.totalPrice)} />
                            </Box>
                            <Divider />
                            <Box sx={style.item.statistic}>
                                <Box sx={style.item.statistic.container} >
                                    <CrisisAlertOutlinedIcon />
                                    <Box sx={style.item.statistic.container.number} >
                                        <ArrowUpwardOutlinedIcon fontSize='small' />
                                        <ColorText color="#2D9596" children={"5%"} />
                                    </Box>
                                </Box>
                                <Box sx={style.item.statistic.container} >
                                    <CalendarMonthOutlinedIcon />
                                    <Box sx={style.item.statistic.container.number} >
                                        <ArrowUpwardOutlinedIcon color='#2D9596' fontSize='small' />
                                        <ColorText color="#2D9596" children={"5%"} />
                                    </Box>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={style.item}>
                            <Box sx={{ backgroundColor: statisticNumber?.profit < 0 ? "#cc0000" : "#2D9596" }}>
                                <Box sx={style.item.cardTitle}>
                                    <PaidOutlinedIcon />
                                    <Box sx={style.item.cardTitle.text} >Lợi nhuận</Box>
                                </Box>
                            </Box>
                            <Box sx={style.item.cardNumber}>
                                <ColorText color={statisticNumber?.profit < 0 ? "#cc0000" : "#2D9596"} children={formatCurrency(statisticNumber?.profit)} />
                            </Box>
                            <Divider />
                            <Box sx={style.item.statistic}>
                                <Box sx={style.item.statistic.container} >
                                    <CrisisAlertOutlinedIcon />
                                    <Box sx={style.item.statistic.container.number} >
                                        <ArrowUpwardOutlinedIcon fontSize='small' />
                                        <ColorText color="#2D9596" children={"5%"} />
                                    </Box>
                                </Box>
                                <Box sx={style.item.statistic.container} >
                                    <CalendarMonthOutlinedIcon />
                                    <Box sx={style.item.statistic.container.number} >
                                        <ArrowUpwardOutlinedIcon color='#2D9596' fontSize='small' />
                                        <ColorText color="#2D9596" children={"5%"} />
                                    </Box>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={style.item}>
                            <Box sx={{ backgroundColor: "#2D9596" }}>
                                <Box sx={style.item.cardTitle}>
                                    <CurrencyExchangeOutlinedIcon />
                                    <Box sx={style.item.cardTitle.text} >Chi phí</Box>
                                </Box>
                            </Box>
                            <Box sx={style.item.cardNumber}>
                                <ColorText color="#2D9596" children={formatCurrency(statisticNumber?.cost)} />
                            </Box>
                            <Divider />
                            <Box sx={style.item.statistic}>
                                <Box sx={style.item.statistic.container} >
                                    <CrisisAlertOutlinedIcon />
                                    <Box sx={style.item.statistic.container.number} >
                                        <ArrowUpwardOutlinedIcon fontSize='small' />
                                        <ColorText color="#2D9596" children={"5%"} />
                                    </Box>
                                </Box>
                                <Box sx={style.item.statistic.container} >
                                    <CalendarMonthOutlinedIcon />
                                    <Box sx={style.item.statistic.container.number} >
                                        <ArrowUpwardOutlinedIcon color='#2D9596' fontSize='small' />
                                        <ColorText color="#2D9596" children={"5%"} />
                                    </Box>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={7} style={{ maxHeight: "500px" }}>
                        <Card sx={style.item}>
                            <Box sx={{ backgroundColor: "#2D9596" }}>
                                <Box sx={style.item.cardTitle}>
                                    <TimelineOutlinedIcon />
                                    <Box sx={style.item.cardTitle.text} >Thống kê trong năm</Box>
                                    <CustomSelect style={{color:"white"}} value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} >
                                        {getLast5Years().map((year) => {
                                            return (<MenuItem value={year} >{year}</MenuItem>)
                                        })}
                                    </CustomSelect>
                                </Box>

                            </Box>
                            <Box sx={style.item.chartContainer}>
                                <StatisticChart statisticYear={statisticYear}/>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} style={{ maxHeight: "500px" }}>
                        <Card sx={style.item}>
                            <Box sx={{ backgroundColor: "#2D9596" }}>
                                <Box sx={style.item.cardTitle}>
                                    <EmojiEventsOutlinedIcon />
                                    <Box sx={style.item.cardTitle.text} >Top 10 sản phẩm bán chạy</Box>
                                </Box>
                            </Box>
                            <Box sx={style.item.rankProductContainer}>
                                {top10.map((product, index) => {
                                    return (
                                        <RankProduct key={product.product_id} number={index + 1} product={product} />
                                    )
                                })}
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
/**  @type {import("@mui/material").SxProps} */
const style = {
    pageTitle: {
        mb: 2,
    },
    item: {
        cardTitle: {
            display: "flex",
            alignItems: "center",
            text: {
                fontSize: "1.2rem",
                ml: 1
            },
            p: 1.5,
            color: "white"
        },
        cardNumber: {
            fontSize: "1.3em",
            fontWeight: "500",
            p: 1.5,
        },
        statistic: {
            display: "flex",
            p: 1.5,
            justifyContent: "space-around",
            container: {
                p: 1,
                display: "flex",
                backgroundColor: "#F0F3FF",
                alignItems: "baseline",
                number: {
                    ml: 2,
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1rem"
                }
            }
        },
        chartContainer: {
            color: "#2D9596",
            height: "auto",
            width: "100%",
            padding: "1em",
            maxHeight: "400px"
        },
        rankProductContainer: {
            p: 2,
            maxHeight: "333px",
            overflowY: "scroll"
        }


    }
}
export default Dashboard