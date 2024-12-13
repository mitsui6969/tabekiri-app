import React from "react";
import './createPost.css'
import { TextField } from "@mui/material";

const CreatePost = ({handleShowModal}) => {
    const [TextPost, setTextPost] = ('');

    const handleCloseModal = () => {
        handleShowModal(false);
    }

    const onChangeInput = (event) => {      //入力内容が変化したときに実行する関数
        setTextPost(event.target.value); 
    };

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
                    <TextField 
                        sx={{ "& .MuiInputBase-input": { height: 50 }, width: 500 }}
                        label="最近どう？"
                        multiline
                        rows={10} // 高さを行で設定
                        variant="standard"
                        onChange={onChangeInput} 
                    /> 
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
