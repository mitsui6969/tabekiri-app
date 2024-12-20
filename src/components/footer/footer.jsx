import React, { useState, useEffect } from 'react';
import './footer.css';
import { Link, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const Footer = () => {
    const [showModal, setShowModal] = useState(false); // クーポン使用確認モーダル
    const [showConfirmationModal, setShowConfirmationModal] = useState(false); // クーポン使用後モーダル
    const [showNoCouponsModal, setShowNoCouponsModal] = useState(false); // クーポンがないモーダル
    const [qupons, setQupons] = useState(null); // クーポンの数
    const navigate = useNavigate();
    const db = getFirestore(); // Firestore インスタンス
    const auth = getAuth(); // 現在のユーザー情報

    // Firestore からクーポン数を取得
    useEffect(() => {
        const fetchQupons = async () => {
            const user = auth.currentUser;
            if (!user) {
                console.error('ユーザーがログインしていません');
                return;
            }
            try {
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setQupons(data.qupons || 0); // クーポン数をセット
                } else {
                    console.error('ユーザードキュメントが存在しません');
                }
            } catch (error) {
                console.error('クーポン取得中にエラーが発生しました:', error);
            }
        };

        fetchQupons();
    }, [auth.currentUser, db]);

    const handleUseCoupon = async () => {
        if (qupons <= 0) {
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

            const userDocRef = doc(db, 'users', user.uid);
            await updateDoc(userDocRef, {
                qupons: increment(-1),
            });

            setQupons((prevQupons) => prevQupons - 1); // ローカルのクーポン数を更新
            setShowModal(false);
            setShowConfirmationModal(true); // 使用後モーダルを表示
        } catch (error) {
            console.error('クーポンの使用中にエラーが発生しました:', error);
            alert('クーポンの使用に失敗しました。もう一度お試しください。');
        }
    };

    return (
        <div>
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
            <div className="under-bar">
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

            {/* クーポン使用確認モーダル */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>クーポンを使用しますか？</p>
                        {qupons !== null && (
                            <p>
                                現在のクーポン残数: <strong>{qupons}</strong>
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
        </div>
    );
};

export default Footer;
