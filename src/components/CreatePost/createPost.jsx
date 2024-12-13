import React from "react";
import './createPost.css'
import { TextField } from "@mui/material";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from "../../firebase/firebase";
// import firebase from '../../firebase/firebase'

const CreatePost = ({handleShowModal}) => {
    const db = getFirestore(app);
    const [textPost, setTextPost] = ('');
    // const [images, setImages] = (null);
    // const [shopInfo, setShopInfo] = (null);

    const handleCloseModal = () => {
        handleShowModal(false);
    }

    const onChangeInput = (event) => {      //入力内容が変化したときに実行する関数
        setTextPost(event.target.value); 
    };

    const pushPost = async () => {
        try {
            // Firestoreにデータを保存
            await addDoc(collection(db, "post"), {
                caption: textPost, // 投稿の内容
                action: 0, // いいね数の初期値
                date: serverTimestamp(), // サーバーの現在時刻
                // image: images, // 仮の画像情報
                // shop: shopInfo, // 仮のお店情報
                uid: "user-id-placeholder", // ユーザーID（本来は認証から取得する）
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
                    <button onClick={handleCloseModal}>キャンセル</button>
                    <button onClick={pushPost}>投稿</button>
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
