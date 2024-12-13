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
                <div className="modalTop">
                    <button onClick={handleCloseModal}>キャンセル</button>
                    <button>投稿</button>
                </div>
                <div className="modalCenter">
                    {/* ここに書く */}
                    <p>最近どう？</p>
                </div>
                <div className="modalBottom">
                    {/* ここに画像選択とか、文字数とか */}
                </div>
                
            </div>
        </div>
        </>
    );
};

export default CreatePost;
