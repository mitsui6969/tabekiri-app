import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Firebase Firestore用
// import { getAuth } from 'firebase/auth'; // Firebase認証用
import { app } from '../../firebase/firebase'; // Firebaseアプリの設定ファイルをインポート
// import './Post.css'; // CSSファイルでスタイルを適用

const Post = ({ postId }) => {
    const [postData, setPostData] = useState(null);
    const [userData, setUserData] = useState(null);

    const db = getFirestore(app);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // 投稿データを取得
                const postRef = doc(db, 'post', postId);
                const postSnap = await getDoc(postRef);

                if (postSnap.exists()) {
                    setPostData(postSnap.data());

                    // ユーザーデータを取得
                    const userRef = doc(db, 'user', postSnap.data().uid);
                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists()) {
                        setUserData(userSnap.data());
                    }
                }
            } catch (error) {
                console.error('エラーが発生しました:', error);
            }
        };

        fetchPost();
    }, [db, postId]);

    if (!postData || !userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="post">
            {/* アイコン */}
            <div className="post__icon">
                {/* アイコンがあれば画像表示、なければデフォルト */}
                <img src="/default-icon.png" alt="User Icon" />
            </div>

            {/* ユーザーネーム */}
            <div className="post__user">
                <strong>{userData.name}</strong>
            </div>

            {/* 投稿内容 */}
            <div className="post__content">
                <p>{postData.caption}</p>
            </div>

            {/* ハッシュタグ (優先度低) */}
            <div className="post__hashtags">
                {/* 必要であれば解析してタグを表示 */}
            </div>

            {/* 画像 */}
            {postData.image && (
                <div className="post__image">
                    <img src={postData.image} alt="Post" />
                </div>
            )}

            {/* 投稿日時 */}
            <div className="post__date">
                <small>{new Date(postData.date.seconds * 1000).toLocaleString()}</small>
            </div>
        </div>
    );
};

Post.propTypes = {
    postId: PropTypes.string.isRequired, // postIdは必須かつ文字列型
};

export default Post;
