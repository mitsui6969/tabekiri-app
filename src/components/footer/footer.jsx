import React, { useState, useEffect } from 'react';
import './footer.css';
import { Link, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import CreatePost from '../CreatePost/createPost';

export const Footer = ({ refreshPosts }) => {
    const [showModal, setShowModal] = useState(false); // クーポン使用確認モーダル
    const [showConfirmationModal, setShowConfirmationModal] = useState(false); // クーポン使用後モーダル
    const [showNoCouponsModal, setShowNoCouponsModal] = useState(false); // クーポンがないモーダル
    const [coupons, setCoupons] = useState(null); // クーポンの数
    const [showPostModal, setShowPostModal] = useState(false);
    const navigate = useNavigate();
    const db = getFirestore(); // Firestore インスタンス
    const auth = getAuth(); // 現在のユーザー情報

    // Firestore からクーポン数を取得
    useEffect(() => {
        const fetchCoupons = async () => {
            const user = auth.currentUser;
            if (!user) {
                console.log('ユーザーがログインしていません');
                return;
            }
            try {
                const userDocRef = doc(db, 'user', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setCoupons(data.coupons || 0); // クーポン数をセット
                } else {
                    console.error('ユーザードキュメントが存在しません');
                }
            } catch (error) {
                console.error('クーポン取得中にエラーが発生しました:', error);
            }
        };

        fetchCoupons();
    }, [auth.currentUser, db]);

    const handleUseCoupon = async () => {
        if (coupons <= 0) {
            setShowModal(false);
            setShowNoCouponsModal(true); // クーポンがないモーダルを表示
            return;
        }

        try {
            const user = auth.currentUser;
            if (!user) {
                alert('ユーザーがログインしていません');
                return;
            }

            const userDocRef = doc(db, 'user', user.uid);
            await updateDoc(userDocRef, {
                coupons: increment(-1), // Firestore 内で直接クーポンを減らす
            });

            setCoupons((prevCoupons) => prevCoupons - 1); // ローカルのクーポン数を更新
            setShowModal(false);
            setShowConfirmationModal(true); // 使用後モーダルを表示
        } catch (error) {
            console.error('クーポンの使用中にエラーが発生しました:', error);
            alert('クーポンの使用に失敗しました。もう一度お試しください。');
        }
    };

    // モーダルウィンドウの表示非表示
    const handleShowModal = (bool) => {
        setShowPostModal(bool);
    }

    return (
        <div>
            <div className="under-bar">
                <div className='fot-btns'>
                    <div className="background-bar">
                        <Link to='/QRcode'>
                            <div className="circle-button">
                                <img
                                    src="https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_qrcode_1.png"
                                    alt="QR Code"
                                />
                            </div>
                        </Link>
                    </div>

                    <button
                        id='create-post-btn'
                        onClick={() => handleShowModal(true)}
                    >
                        投稿
                    </button>

                    <div
                        className="coupon-button"
                        onClick={() => setShowModal(true)} // クーポン確認モーダルを開く
                    >
                        <img
                            src="https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_coupon_3.png"
                            alt="AAA"
                        />
                    </div>
                </div>
            </div>

            {/* クーポン使用確認モーダル */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>クーポンを使用しますか？</p>
                        {coupons !== null && (
                            <p>
                                現在のクーポン残数: <strong>{coupons}</strong>
                            </p>
                        )}
                        <div className="modal-actions">
                            <button
                                onClick={handleUseCoupon}
                                className="confirm-button"
                            >
                                はい
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="cancel-button"
                            >
                                いいえ
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* クーポン使用後モーダル */}
            {showConfirmationModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>クーポンを使用しました！</p>
                        <div className="modal-actions">
                            <button
                                onClick={() => {
                                    setShowConfirmationModal(false);
                                    navigate('/');
                                }}
                                className="confirm-button"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* クーポンがないモーダル */}
            {showNoCouponsModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>クーポンがありません</p>
                        <div className="modal-actions">
                            <button
                                onClick={() => setShowNoCouponsModal(false)}
                                className="confirm-button"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 投稿作成モーダル */}
            {showPostModal && <CreatePost handleShowModal={handleShowModal} refreshPosts={refreshPosts}/>}
        </div>
    );
};

export default Footer;
