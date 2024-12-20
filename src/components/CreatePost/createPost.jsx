import React, { useState } from "react";
import './createPost.css'
import { TextField, Button } from "@mui/material";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from "../../firebase/firebase";
import { getAuth } from "firebase/auth";
// import firebase from '../../firebase/firebase'

const CreatePost = ({handleShowModal}) => {
    const db = getFirestore(app);
    const auth = getAuth(app);
    const [textPost, setTextPost] = useState('');
    // const [images, setImages] = (null);
    // const [shopInfo, setShopInfo] = (null);

    const handleCloseModal = () => {
        handleShowModal(false);
    }

    const onChangeInput = (event) => {      //入力内容が変化したときに実行する関数
        setTextPost(event.target.value); 
    };

    const pushPost = async () => {
        const user = auth.currentUser;
        try {
            // Firestoreにデータを保存
            await addDoc(collection(db, "post"), {
                caption: textPost, // 投稿の内容
                action: 0, // いいね数の初期値
                date: serverTimestamp(), // サーバーの現在時刻
                // image: images, // 仮の画像情報
                // shop: shopInfo, // 仮のお店情報
                uid: user.uid, // ユーザーID
            });
            handleCloseModal(); // モーダルを閉じる
        } catch (error) {
            console.error("投稿保存中にエラーが発生しました:", error);
            alert("投稿の保存に失敗しました。");
        }
    };

    return (
        <>
        <div id="overlay">
            <div id="modalContent">
                <div className="modalTop">
                    <Button className="cancel-btn" onClick={handleCloseModal}>キャンセル</Button>
                    <Button className="post-btn" onClick={pushPost} disabled={!textPost}>投稿</Button>
                </div>
                <div className="modalCenter">
                    {/* ここに書く */}
                    <TextField 
                        sx={{ "& .MuiInputBase-input": { height: 50 }, width: 500 }}
                        label="最近どう？"
                        multiline
                        rows={10}
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
