import React from "react";
import './createPost.css'

const CreatePost = ({handleShowModal}) => {
    const handleCloseModal = () => {
        handleShowModal(false);
    }

    return (
        <>
        <div id="overlay">
            <div id="modalContent">
            <p>This is ModalContent</p>
            <button onClick={handleCloseModal}>Close</button>
            </div>
        </div>
        </>
    );
};

export default CreatePost;
