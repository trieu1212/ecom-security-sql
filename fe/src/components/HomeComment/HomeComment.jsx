import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./HomeComment.css";
import star from "../../assets/images/star.png";
import avata1 from "../../assets/images/avata1.jpg";
import avata2 from "../../assets/images/avata2.jpg";
import next from "../../assets/images/next.png";
import prev from "../../assets/images/prev.png";
const HomeComment = () => {
  const [translateY, setTranslateY] = useState(0);
  const commentListRef = useRef(null);
  const handleNextClick = () => {
    const commentListHeight = commentListRef.current.scrollHeight;
    if (translateY > -commentListHeight + 400) {
      setTranslateY((prevTranslateY) => prevTranslateY - 400);
    } else {
      setTranslateY(0);
    }
  };

  const handlePrevClick = () => {
    const commentListHeight = commentListRef.current.scrollHeight;
    if (translateY < 0) {
      setTranslateY((prevTranslateY) => prevTranslateY + 400);
    } else {
      setTranslateY(-commentListHeight + 400);
    }
  };
  return (
    <>
      <div id="comment">
        <h2>NHẬN XÉT CỦA KHÁCH HÀNG</h2>
        <div id="comment-body">
          <div class="prev" onClick={handlePrevClick}>
            <Link to="#">
              <img src={prev} alt="" />
            </Link>
          </div>
          <ul
            id="list-comment"
            ref={commentListRef}
            style={{ transform: `translateY(${translateY}px)` }}
          >
            <li class="item">
              <div class="avatar">
                <img src={avata1} alt="" />
              </div>
              <div class="stars">
                <span>
                  <img src={star} alt="" />
                </span>
                <span>
                  <img src={star} alt="" />
                </span>
                <span>
                  <img src={star} alt="" />
                </span>
                <span>
                  <img src={star} alt="" />
                </span>
                <span>
                  <img src={star} alt="" />
                </span>
              </div>
              <div class="name">Quốc Triệu</div>

              <div class="text">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </li>
            <li class="item">
              <div class="avatar">
                <img src={avata2} alt="" />
              </div>
              <div class="stars">
                <span>
                  <img src={star} alt="" />
                </span>
                <span>
                  <img src={star} alt="" />
                </span>
                <span>
                  <img src={star} alt="" />
                </span>
                <span>
                  <img src={star} alt="" />
                </span>
                <span>
                  <img src={star} alt="" />
                </span>
              </div>
              <div class="name">Bích Trâm</div>

              <div class="text">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </li>
          </ul>
          <div class="next" onClick={handleNextClick}>
            <Link to="#">
              <img src={next} alt="" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeComment;
