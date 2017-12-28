import React from 'react'
import { Link } from 'react-router-dom'
import AddNewMovie from './api/addNewMovie'
import UpdateReview from './api/updateReview'
import DeleteReview from './api/deleteReview'

const ReviewBody = ({ paramsId, movie, APIstate=f=>f, currentUser, currentReview, editReview, onEdit=f=>f }) => {

    let reviewRefs, usernameRefs, actionType

    const OnSubmit = (e) => { // don't use 'onSubmit' as a variable/function name, its a reserved event keyword
        e.preventDefault()
        if (movie.reviews) { // Movie available on local db
            if (!usernameRefs) { // user has login and will add review
                UpdateReview (
                    paramsId,
                    movie,
                    currentUser,
                    reviewRefs.value,
                    APIstate
                )
            } else { // will login and add review
                UpdateReview (
                    paramsId,
                    movie,
                    usernameRefs.value,
                    reviewRefs.value,
                    APIstate
                )
            }

        } else if (!usernameRefs) { // user has login and will add review
            AddNewMovie (
                paramsId,
                movie,
                currentUser,
                reviewRefs.value,
                APIstate
            )
        } else { // will login and add review
            AddNewMovie (
                paramsId,
                movie,
                usernameRefs.value,
                reviewRefs.value,
                APIstate
            )
        }
    }

    const fullForm = () => {
        return (
            <form onSubmit={OnSubmit}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    ref={el => usernameRefs = el} />
                <textarea 
                    type="text"
                    placeholder="Write your review..."
                    ref={el => reviewRefs = el} 
                    className="form-control" />
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-info">
                       Sumbit
                    </button>
                </span>
            </form>
        )
    }

    const reviewForm = () => {
        return (
            <form onSubmit={OnSubmit}>
            <textarea 
                type="text"
                placeholder="Write your review..."
                ref={el => reviewRefs = el} // can't use this.refs on stateless component
                className="form-control" />
            <span className="input-group-btn">
                <button type="submit" className="btn btn-info">
                   Sumbit
                </button>
            </span>
            </form>
        )
    }

    const userAsObjKey = (e) => { // assign user as object key for review array
        return (
            e.reviews.reduce((obj, v) => {
                obj[v.user] = v
                return obj
                }, {})
        )
    }

    const reviewBody = (arr) => {
        return (
            <div>
                <span>Your Review: {arr[currentUser].review}</span>
                <a onClick={onEdit}>EDIT</a>
                <a onClick={(e) => DeleteReview(paramsId, movie, currentUser, currentReview, APIstate)}>DELETE</a>
            </div>
        )
    }

    const reviewList = (arr) => {
        return (
            <div>
                <h3>Review list:</h3>
                {Object.keys(arr).map((key, i) =>
                    <div key={i} className="Movies">
                        <span>Review: {arr[key].review} by {arr[key].user}</span>
                    </div>
                )}
            </div>
        )
    }

    const userReviewAndFormArea = () => { // logic for user review info & full form

        if (currentUser) { // If current user exist and movie.review exist
            if (movie.reviews) { 
                let ReviewObj = userAsObjKey(movie)
                if (ReviewObj[currentUser]) {
                    if (editReview) { return (reviewForm())
                    } else { return (reviewBody(ReviewObj)) }
                } else { return (reviewForm()) }
            } else { return (reviewForm()) }
        } else { return (fullForm()) }

    }

    const reviewListArea = () => { 
        if (!movie.reviews) {
            return (<p>No review yet.</p>)
        } else if (movie.reviews.length === 0) {
            return (<p>No review yet.</p>)
        } else {
            let ReviewObj = userAsObjKey(movie)
            return (reviewList(ReviewObj))
        }
    }

    return (
        <div>
            {userReviewAndFormArea()}
            {reviewListArea()}
        </div>
    )
}

export default ReviewBody
