import React, { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import Comment from './Review';
import StarRating from './StarRating';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from '../Admin/notify';
import { addComment } from '../../redux/reducer/ReviewSlice';
import StarDisplay from './StarDisplay';
const Reviews = (props) => {
    const { id, rating, number_rating, number_star } = props
    const dispatch = useDispatch()
    const [reviews, setReviews] = useState([])
    const comments = useSelector((state) => state.review.comments)
    const [statistics, setStatstics] = useState([]);
    const [percentages, setPercentages] = useState([]);
    const [comment, setComment] = useState("")
    const convertToPercentages = (arr) => {
        const sum = arr.reduce((acc, curr) => acc + curr, 0);
        if(sum===0) return [0,0,0,0,0]
        const percentages = arr.map(item => (item / sum) * 100);
        console.log(percentages);
        return percentages;
    }
    useEffect(() => {
        const fetchStatistics = () => {
            let tmp = [0, 0, 0, 0, 0]
            console.log(number_star)
            if (number_star!==undefined) {
                number_star.map((star) => {
                    tmp[star.ranking - 1] = star.number_ranking
                })
            }
            console.log(tmp)
            setPercentages(convertToPercentages(tmp).reverse())
            setStatstics(tmp.reverse());
        }
        fetchStatistics();
    }, [number_star])
    return (
        <div className="p-[30px] rounded-b-[12px] bg-[#feefe8] relative z-1">
            <div>
                <div className="flex justify-between items-center">
                    <div className="mb-[20px]">
                        <div className='flex max-[800px]:flex-col items-center'>
                            <p className="text-[#f6af15] font-[700] text-[40px]">
                                {rating} <span className="text-[24px]">/5</span>
                            </p>
                            <div className="flex ml-4 gap-2 text-lg">
                                <StarDisplay rating={rating} />
                            </div>
                        </div>

                        <span>(
                            {/* {statistics.reduce((a, b) => a + b, 0)} */}
                            {number_rating} đánh giá)</span>
                    </div>

                    <div>
                        <span className="text-[16px]">
                            Nhận xét/Đánh giá của{" "}
                            <button
                                className="text-[#e10600] font-[700] no-underline"
                            >
                                người mua hàng
                            </button>
                        </span>
                    </div>
                </div>
                <div className='flex gap-5'>
                    <div className='flex flex-col gap-y-2'>
                        <div className='flex items-center gap-x-3'>
                            <div className='flex gap-x-1'>
                                <FaStar color='orange' />
                                <FaStar color='orange' />
                                <FaStar color='orange' />
                                <FaStar color='orange' />
                                <FaStar color='orange' />
                            </div>
                            <div className='w-40 bg-[rgb(209,209,211)] h-2 rounded'>
                                <div className={`bg-[rgb(10,104,255)] h-2 rounded`} style={{ width: `${percentages[0]}%` }}></div>
                            </div>
                            <div>{statistics[0]}</div>
                        </div>
                        <div className='flex items-center gap-x-3'>
                            <div className='flex gap-x-1'>
                                <FaStar color='orange' />
                                <FaStar color='orange' />
                                <FaStar color='orange' />
                                <FaStar color='orange' />
                                <FaStar color='rgb(209,209,211)' />
                            </div>
                            <div className='w-40 bg-[rgb(209,209,211)] h-2 rounded'>
                                <div className={`bg-[rgb(10,104,255)] h-2 rounded`} style={{ width: `${percentages[1]}%` }}></div>
                            </div>
                            <div>{statistics[1]}</div>
                        </div>
                        <div className='flex items-center gap-x-3'>
                            <div className='flex gap-x-1'>
                                <FaStar color='orange' />
                                <FaStar color='orange' />
                                <FaStar color='orange' />
                                <FaStar color='rgb(209,209,211)' />
                                <FaStar color='rgb(209,209,211)' />
                            </div>
                            <div className='w-40 bg-[rgb(209,209,211)] h-2 rounded'>
                                <div className={`bg-[rgb(10,104,255)] h-2 rounded`} style={{ width: `${percentages[2]}%` }}></div>
                            </div>
                            <div>{statistics[2]}</div>
                        </div>
                        <div className='flex items-center gap-x-3'>
                            <div className='flex gap-x-1'>
                                <FaStar color='orange' />
                                <FaStar color='orange' />
                                <FaStar color='rgb(209,209,211)' />
                                <FaStar color='rgb(209,209,211)' />
                                <FaStar color='rgb(209,209,211)' />
                            </div>
                            <div className='w-40 bg-[rgb(209,209,211)] h-2 rounded'>
                                <div className={`bg-[rgb(10,104,255)] h-2 rounded`} style={{ width: `${percentages[3]}%` }}></div>
                            </div>
                            <div>{statistics[3]}</div>
                        </div>
                        <div className='flex items-center gap-x-3'>
                            <div className='flex gap-x-1'>
                                <FaStar color='orange' />
                                <FaStar color='rgb(209,209,211)' />
                                <FaStar color='rgb(209,209,211)' />
                                <FaStar color='rgb(209,209,211)' />
                                <FaStar color='rgb(209,209,211)' />
                            </div>
                            <div className='w-40 bg-[rgb(209,209,211)] h-2 rounded'>
                                <div className={`bg-[rgb(10,104,255)] h-2 rounded`} style={{ width: `${percentages[4]}%` }}></div>
                            </div>
                            <div>{statistics[4]}</div>
                        </div>

                    </div>
                    {/* <div className="flex-1 flex flex-col items-end gap-2">
                        <textarea name="" id="" className="w-full rounded-lg p-4" rows="5"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}

                        ></textarea>
                        <button className="px-2 py-0.5 border-solid border-[#6c757d] text-[#6c757d] border-[1px] rounded hover:bg-[#6c757d] hover:text-white"
                            onClick={handleAddComment}
                        >Gửi</button>
                    </div> */}
                    <div className="border-solid border-b-[1px] border-b-[#f6dacd] pb-[20px] relative mb-2"></div>
                    <div className='flex flex-col gap-y-3 mt-3npm sd flex-1'>
                        {
                            comments && comments.map((comment) => (
                                <Comment key={comment.id} data={comment} />
                            ))
                        }
                    </div>
                </div>





            </div>
            <div>

            </div>
        </div>
    );
};

export default Reviews;