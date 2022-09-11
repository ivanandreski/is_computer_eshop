import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import ForumApiService from "../../api/ForumApiService";

import FormTextField from "../Core/FormTextField";
import { useEffect } from "react";

const EditPost = ({ post, show, setShow, setRender }) => {
  const axiosPrivate = useAxiosPrivate();
  const forumApi = new ForumApiService(axiosPrivate);

  const clearForm = () => {
    return {
      title: post.title,
      text: post.text,
    };
  };

  const [editPost, setEditPost] = useState(clearForm());

  useEffect(() => {
    setEditPost(clearForm());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const handleClose = () => {
    setEditPost(clearForm());
    setShow(false);
  };

  const handleSave = async () => {
    try {
      await forumApi.editPost(editPost, post.hashId);
      setRender((render) => render + 1);
      setEditPost(clearForm());
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormTextField
            object={editPost}
            setObject={setEditPost}
            id={"title"}
            title="Title"
          />
          <FormTextField
            object={editPost}
            setObject={setEditPost}
            id={"text"}
            title="Text"
            type="textarea"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditPost;
