import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getAllBlog } from "../Redux/actions/blog";
import Comment from "./Comment";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";
const Card = (props) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const commentFormHandler = (e) => {
    e.preventDefault();
    const id = props.id;

    dispatch(createComment(name, comment, id));
  };
  const { message, error, loading } = useSelector((state) => state.blog);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);

      dispatch({ type: "clearMessage" });
      setName("");
      setComment("");
    }

    dispatch(getAllBlog());
  }, [message, error, dispatch]);

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <div className="box btn_shadow ">
        <div className="img">
          <img src={props.poster.url} alt="" onClick={toggleModal} />
        </div>
        <div className="category d_flex">
          <span onClick={toggleModal}>
            {" "}
            {moment(props.createdAt).format("Do MMMM  YYYY,  dddd,  h:mm:ss a")}
          </span>
          <label>
            <i className="far fa-heart"></i> {props.createdBy}
          </label>
        </div>
        <div className="title">
          <h2 onClick={toggleModal}>{props.title}</h2>
          <a href="#popup" className="arrow" onClick={toggleModal}>
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>

      {/* Popup box */}
      {modal && (
        <div className="modal modal-blog">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div className="modal-img left">
              <img src={props.poster.url} alt="" />
            </div>
            <div className="modal-text right">
              <span>
                {moment(props.createdAt).format(
                  "Do MMMM  YYYY,  dddd,  h:mm:ss a"
                )}
              </span>
              <h1>{props.title}</h1>
              <p>{props.description}</p>
              <h4>POSTED BY - {props.createdBy}</h4>
              <button className="close-modal btn_shadow" onClick={toggleModal}>
                <i class="fas fa-times"></i>
              </button>

              {/*---------Leave Message----------  */}
              <div className="contact mtop">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      <h1>Comments</h1>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {props.comments &&
                      props.comments.map((value) => {
                        return (
                          <Comment
                            key={value._id}
                            comment={value.comment}
                            name={value.name}
                            createdAt={value.createdAt}
                          />
                        );
                      })}
                  </AccordionDetails>
                </Accordion>

                <h1>Leave a Reply</h1>
                <form
                  className="blog_contact d_flex"
                  onSubmit={commentFormHandler}
                >
                  <div className="left">
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={name}
                      size={20}
                      onChange={(e) => setName(e.target.value)}
                    />

                    <button className="btn_shadow" type="submit">
                      SUBMIT NOW{" "}
                      {loading ? (
                        <i class="fa fa-refresh fa-spin"></i>
                      ) : (
                        <i className="fa fa-long-arrow-right"></i>
                      )}
                    </button>
                  </div>
                  <div className="right">
                    <textarea
                      cols="30"
                      rows="12"
                      type="text"
                      placeholder="Comment"
                      name="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                </form>
              </div>
              {/*---------Leave Message----------  */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
