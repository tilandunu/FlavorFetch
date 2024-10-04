import { useParams } from "react-router-dom";
import "@/css/rating.css";

const Rating = () => {

    const { id } = useParams<{ id: string }>(); 

    return (
        <div className="rating-page">
            <div className="review-container">
                <h2 className="heading">Reviews for Recipe {id}</h2>
            </div>
            <div className="review-container">
                <div className="write-review">
                    
                    <input type="text" placeholder="Write your review or comment"/>
                    <select className="rating-star">
                        <option>⭐</option>
                        <option>⭐⭐</option>
                        <option>⭐⭐⭐</option>
                        <option>⭐⭐⭐⭐</option>
                        <option>⭐⭐⭐⭐⭐</option>
                    </select>
                    <button type="submit" className="submit-button">&#10148;</button>
                </div>
            </div>

            <div className="review-container">
                <hr/>
                <div className="review">
                   
                    <div className="review-content">
                        <div className="review-header">
                            <span className="name">D. Fernando</span>
                            <span className="date">2 years ago</span>
                        </div>
                        <div className="rating">
                            <span>⭐</span>
                            <span>⭐</span>
                            <span>⭐</span>
                            <span>⭐</span>
                            <span className="unrated">⭐</span>
                        </div>
                        <p>Great food and good service. The flavor & texture were similar to a potato, with the only difference being that the skins were exceptionally crunchy. We will try again this recipe.</p>
                    </div>
                    <div className="actions">
                        <button className="edit">✏️</button>
                        <button className="delete">🗑️</button>
                    </div>
                </div>
            </div>
            <div className="review-container">
                <hr/>
                <div className="review">
                    
                    <div className="review-content">
                        <div className="review-header">
                            <span className="name">D. Fernando</span>
                            <span className="date">2 years ago</span>
                        </div>
                        <div className="rating">
                            <span>⭐</span>
                            <span>⭐</span>
                            <span>⭐</span>
                            <span>⭐</span>
                            <span className="unrated">⭐</span>
                        </div>
                        <p>Great food and good service. The flavor & texture were similar to a potato, with the only difference being that the skins were exceptionally crunchy. We will try again this recipe.</p>
                    </div>
                    <div className="actions">
                        <button className="edit">✏️</button>
                        <button className="delete">🗑️</button>
                    </div>
                </div>
            </div>
            <div className="review-container">
                <hr/>
                <div className="review">
                    
                    <div className="review-content">
                        <div className="review-header">
                            <span className="name">D. Fernando</span>
                            <span className="date">2 years ago</span>
                        </div>
                        <div className="rating">
                            <span>⭐</span>
                            <span>⭐</span>
                            <span>⭐</span>
                            <span>⭐</span>
                            <span className="unrated">⭐</span>
                        </div>
                        <p>Great food and good service. The flavor & texture were similar to a potato, with the only difference being that the skins were exceptionally crunchy. We will try again this recipe.</p>
                    </div>
                    <div className="actions">
                        <button className="edit">✏️</button>
                        <button className="delete">🗑️</button>
                    </div>
                </div>
            </div>
        </div>

        
    )
}

export default Rating