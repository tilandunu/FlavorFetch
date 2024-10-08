import "@/css/ratingReport.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";

const RatingReport =() => {
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        handleGetAllRatings();
    }, []);

    const handleGetAllRatings = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/rating/get/all`)
            .then(response => {
                setRatings(response.data?.sort((a: any, b: any) => new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime()));
            })
            .catch(error => {
                console.error(error);
            });
    }
    
    return (
        <div className="report-rating-report">
            <div className="report-review-container">
                <h2 className="report-heading" style={{textAlign:"center", width:"100%"}}>Rating Report</h2>
            </div>
            {
                ratings.length > 0 ?
                ratings.map((rating: any) => (
                    <div key={rating.id} className="report-review-container">
                    <div className="report-review-card">
                        <div className="report-review-header">
                            <p className="report-review-title">Name: <strong>{`${rating?.customer?.firstName} ${rating?.customer?.lastName}`}</strong></p>
                            <span className="date"><ReactTimeAgo date={new Date(rating?.createdAt)} locale="en-US"/></span>
                        </div>
                        <div className="report-review-body">
                            <div className="report-review-text">
                                <p>Recipe Id: <strong>{rating?.recipe?._id}</strong></p>
                                <p>Recipe Title: <strong>{rating?.recipe?.title}</strong></p>
                            </div>
                            <p className="report-review-rating"> Rating: 
                                        {rating?.rating === 1 && <span>⭐</span>}
                                        {rating?.rating === 2 && <span>⭐⭐</span>}
                                        {rating?.rating === 3 && <span>⭐⭐⭐</span>}
                                        {rating?.rating === 4 && <span>⭐⭐⭐⭐</span>}
                                        {rating?.rating === 5 && <span>⭐⭐⭐⭐⭐</span>}
                            </p>
                            <p className="report-review-text">Comment: <em><strong>{rating?.comment}</strong></em></p>
                        </div>
                    </div>
                </div>
                ))
                :<div className="report-review-container">
                    <h3 className="heading2">No reviews yet</h3>
                </div>

            }
            
            
        </div>
    )
}

export default RatingReport;