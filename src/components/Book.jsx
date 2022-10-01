import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom'
import Price from "./ui/Price";
import Ratings from "./ui/Ratings";

const Book = ({ book }) => {
    const [img, setImg] = useState()

    // when we switch routes dont set image to unmounted component
    const mountedRef = useRef(true)

    useEffect(() => {
        const image = new Image()
        image.src = book.url
        image.onload = () => {
            setTimeout(() => {
                if (mountedRef.current) {
                    setImg(image)
                }
            }, 300)
        }
        return () => {
            // when the component unmounts
            mountedRef.current = false
        }
    }, [book.url])

    return (
        <div className="book">
            {!img ? (
                <>
                    <div className="book__img--skeleton"></div>
                    <div className="skeleton book__title--skeleton"></div>
                    <div className="skeleton book__rating--skeleton"></div>
                    <div className="skeleton book__price--skeleton"></div>
                </>
            ) : (
                <>
                    <Link to={`/books/${book.id}`}>
                        <figure className="book__img--wrapper">
                            <img src={img.src}
                                className="book__img"
                                alt=""
                            />
                        </figure>
                    </Link>

                    <div className="book__title">
                        <Link to={`/books/${book.id}`} className="book__title--link">
                            {book.title}
                        </Link>
                    </div>

                    <Ratings rating={book.rating} />
                    <Price salePrice={book.salePrice} originalPrice={book.originalPrice} />
                </>
            )}
        </div>
    )
}

export default Book

// const Book = ({ book }) => {
//     return (
//         <div className="book">
//             <a href="">
//                 <figure className="book__img--wrapper">
//                     <img src={book.url}
//                         className="book__img"
//                         alt="" />
//                 </figure>
//             </a>

//             <div className="book__title">
//                 <a href="/" className="book__title--link">
//                     {book.title}
//                 </a>
//             </div>

//             <div className="book__ratings">
//                 {
//                     new Array(5).fill(0).map((_, index) => <FontAwesomeIcon icon="star" key={index} />)
//                 }
//             </div>
//             <div className="book__price">
//                 {book.salePrice ?
//                     (
//                         <>
//                             <span className="book__price--normal">
//                                 ${book.originalPrice.toFixed(2)}
//                             </span>
//                             ${book.salePrice.toFixed(2)}
//                         </>
//                     ) : (
//                         <>${book.originalPrice.toFixed(2)}</>
//                     )}
//             </div>
//         </div>
//     )
// }

// export default Book