import { useParams, useNavigate } from "react-router-dom";
import "@/css/rating.css";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ReactTimeAgo from 'react-time-ago'
import axios from "axios";
import { Modal } from 'react-responsive-modal';
import "react-responsive-modal/styles.css";



const Rating = () => {

    const navigate = useNavigate();

    const [ratings, setRatings] = useState<any>([]);
    const [allRatings, setAllRatings] = useState<any>([]);
    const [open, setOpen] = useState(false);

    const [updateRating, setUpdateRating] = useState<any>( {} );
    const [newRating, setNewRating] = useState(1);
    const [newComment, setNewComment] = useState("");


    const { id } = useParams<{ id: string }>(); 

    useEffect(() => {
        handleGetAllRatings();
    }, []);

    
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const handleOnSearch=(e: any) => {
        e.preventDefault();

        if (e.target.value === "") {
            setRatings(allRatings)
        }else{
            const filteredRatings = allRatings.filter((rating: any) => {
                const searchValue = e.target.value.toLowerCase();
                console.log(rating);
                const fullName = `${rating?.customer?.firstName} ${rating?.customer?.lastName}`.toLowerCase();
                if ((rating?.customer?.firstName?.toLowerCase()?.includes(searchValue?.toLowerCase())) || 
                (rating?.customer?.lastName?.toLowerCase()?.includes(searchValue?.toLowerCase())) || 
                (fullName?.includes(searchValue?.toLowerCase()))) {
                    return true;
                } else {
                    return false
                }
            })
    
            setRatings(filteredRatings);
        }
        
    }

    const handleOnEdit = (rating: any) => {
        setUpdateRating(rating);
        onOpenModal();
    }

    const handleOnSelectUpdate = (e: any) => {
        setUpdateRating((prev: any)=>({...prev, rating: e.target.value}));
    }

    const handleOnCommentUpdate = (e: any) => {
        setUpdateRating((prev: any)=>({...prev, comment: e.target.value}));
    }

    const handleOnNewRating = (e: any) => {
        setNewRating(e.target.value);
    }

    const handleOnNewComment = (e: any) => {
        setNewComment(e.target.value);
    }

    const handleOnDelete = (id: string) => {
        axios.delete(`${import.meta.env.VITE_API_URL}/rating/delete/${id}`)
            .then(response => {
                handleGetAllRatings();
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleGetAllRatings = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/rating/get/recipe/${id}`)
            .then(response => {
                setAllRatings(response.data);
                setRatings(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleSaveRatings = () => {

        axios.post(`${import.meta.env.VITE_API_URL}/rating/save`, {
            recipe: id,
            customer: "66ca4ead42a3ad0a30239684",
            rating: newRating,
            comment: newComment
        })
        .then(response => {
            handleGetAllRatings();
            setNewComment("");
            setNewRating(1);
        })
        .catch(error => {
            console.error(error);
        });
    }

    const handleUpdate = () => {

        axios.put(`${import.meta.env.VITE_API_URL}/rating/update/${updateRating?._id}`, updateRating)
            .then(response => {
                handleGetAllRatings();
               onCloseModal();
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleViewRecipe = () => {
        navigate(`/recipePage/${id}`);
    }



    return (
        <div className="recipe-rating-page">
            <Modal open={open} onClose={onCloseModal} center> 
            {/* <div className="modal-container"> */}
                <h2>Edit Review</h2>
                <div className="recipe-write-review">
                    <div className="recipe-avatar"></div>
                    <input type="text" placeholder="Write your review or comment" value={updateRating?.comment} onChange={handleOnCommentUpdate}/>
                    <select className="recipe-rating-star" value={updateRating?.rating} onChange={handleOnSelectUpdate}>
                        <option value={1}>⭐</option>
                        <option value={2}>⭐⭐</option>
                        <option value={3}>⭐⭐⭐</option>
                        <option value={4}>⭐⭐⭐⭐</option>
                        <option value={5}>⭐⭐⭐⭐⭐</option>
                    </select>
                    <button type="submit" className="recipe-submit-button" onClick={handleUpdate}>&#10148;</button>
                </div>
            {/* </div> */}
            </Modal>
            <div className="recipe-review-container">
                
                <span className="material-symbols-outlined" onClick={handleViewRecipe} style={{cursor: "pointer", paddingTop: "10px"}}>arrow_back</span>
                <h2 className="recipe-heading">Reviews</h2>
                <br/>
                <input type="text" placeholder="Search" onChange={handleOnSearch}/>
            </div>
            <div className="recipe-review-container">
                <div className="recipe-write-review">
                    <div className="recipe-avatar"></div>
                    <input type="text" placeholder="Write your review or comment" value={newComment} onChange={handleOnNewComment} />
                    <select className="recipe-rating-star" value={newRating} onChange={handleOnNewRating} >
                        <option value={1}>⭐</option>
                        <option value={2}>⭐⭐</option>
                        <option value={3}>⭐⭐⭐</option>
                        <option value={4}>⭐⭐⭐⭐</option>
                        <option value={5}>⭐⭐⭐⭐⭐</option>
                    </select>
                    <button type="submit" className="recipe-submit-button" onClick={handleSaveRatings}>&#10148;</button>
                </div>
            </div>

            {
                ratings.length > 0 ?
                ratings.map((rating: any) => {
                    return (
                        <div key={rating._id} className="recipe-review-container">
                            <hr/>
                            <div className="recipe-review">
                                <div className="recipe-avatar"></div>
                                <div className="recipe-review-content">
                                    <div className="recipe-review-header">
                                        <span className="recipe-name">{`${rating?.customer?.firstName} ${rating?.customer?.lastName}`}</span>
                                        <span className="date"><ReactTimeAgo date={new Date(rating?.createdAt)} locale="en-US"/></span>
                                    </div>
                                    <div className="recipe-rating">
                                        {rating?.rating === 1 && <span>⭐</span>}
                                        {rating?.rating === 2 && <span>⭐⭐</span>}
                                        {rating?.rating === 3 && <span>⭐⭐⭐</span>}
                                        {rating?.rating === 4 && <span>⭐⭐⭐⭐</span>}
                                        {rating?.rating === 5 && <span>⭐⭐⭐⭐⭐</span>}
                                    </div>
                                    <p>{rating?.comment}</p>
                                </div>
                                <div className="recipe-actions">
                                    <button className="edit" onClick={() => handleOnEdit(rating)}>✏️</button>
                                    <button className="delete" onClick={() => handleOnDelete(rating?._id)}>🗑️</button>  
                                </div>
                            </div>
                        </div>
                    )
                })
                :<div className="review-container">
                    <h3 className="heading2">No reviews yet</h3>
                </div>
            }
     
        </div>

        
    )
}

export default Rating