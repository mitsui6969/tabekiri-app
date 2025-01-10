import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Firebase Firestore用
// import { getAuth } from 'firebase/auth'; // Firebase認証用
import { app } from '../../firebase/firebase'; // Firebaseアプリの設定ファイルをインポート
import './post.css'; // CSSファイルでスタイルを適用

const Post = ({ postId }) => {
    const [postData, setPostData] = useState(null);
    const [userData, setUserData] = useState(null);

    const db = getFirestore(app);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postRef = doc(db, 'post', postId);
                const postSnap = await getDoc(postRef);

                if (!postSnap.exists()) {
                    console.error('Post not found:', postId);
                    return;
                }

                const post = postSnap.data();
                setPostData(post);

                const userRef = doc(db, 'user', post.uid);
                const userSnap = await getDoc(userRef);

                if (!userSnap.exists()) {
                    console.error('User not found for UID:', post.uid);
                    return;
                }

                setUserData(userSnap.data());
            } catch (error) {
                console.error('エラーが発生しました:', error);
            }
        };

        fetchPost();
    }, [db, postId]);

    if (!postData || !userData) {
        return <div></div>;
    }

    return (
        <div className="post">
            <div className='post-container'>
            <div className='upper-container'>
                {/* アイコン */}
                {/* <div className="post__icon">
                    
                    <img src="/default-icon.png" alt="User Icon" />
                </div> */}

                {/* ユーザーネーム */}
                <div className="post__user">
                    <strong>{userData.username}</strong>
                </div>

                {/* 投稿日時 */}
                <div className="post__date">
                    <small>{new Date(postData.date.seconds * 1000).toLocaleString('ja-JP', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}</small>
                </div>
            </div>

            {/* 投稿内容 */}
            <div className="post__content">
                <p>{postData.caption}</p>
            </div>

            {/* ハッシュタグ (優先度低) */}
            <div className="post__hashtags">
            </div>

            {/* 画像 */}
            {postData.image && (
                <div className="post__image">
                    <img src={postData.image} alt="Post" />
                </div>
            )}
            </div>
        </div>
    );
};

Post.propTypes = {
    postId: PropTypes.string.isRequired, // postIdは必須かつ文字列型
};

export default Post;
