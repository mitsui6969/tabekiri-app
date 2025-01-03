import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore'; // Firestore用
import { app } from '../firebase/firebase'; // Firebaseアプリの設定ファイル
import Post from '../components/Post/post'; // Postコンポーネントをインポート
import {Footer} from '../components/footer/footer';
import { PointCard } from '../components/PointCard/pointCard';
import '../styles/home.css'
import CreatePost from '../components/CreatePost/createPost';
import Header from '../components/Header/header';

export function Home() {
  const [posts, setPosts] = useState([]); // 投稿データの状態管理
  const db = getFirestore(app);

  const handleNavigate = () => {
    window.location.href = "https://www.infra-linux.com/linux-ex-menu/#%E6%BC%94%E7%BF%92%EF%BC%90%EF%BC%91%EF%BC%8D%EF%BC%92%EF%BC%90";
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Firestoreから投稿データを取得
        const q = query(collection(db, 'post'), orderBy('date', 'desc')); // 投稿を日付順で取得
        const querySnapshot = await getDocs(q);

        const fetchedPosts = [];
        querySnapshot.forEach((doc) => {
          fetchedPosts.push({ id: doc.id, ...doc.data() }); // IDとデータをマージ
        });

        setPosts(fetchedPosts);
      } catch (error) {
        console.error('投稿データの取得中にエラーが発生しました:', error);
      }
    };

    fetchPosts();
  }, [db]);



  return (
    <div>
      <Header/>
      <div className='home-page'>
        {/* ポイントカードの表示 */}
        <div className="pointCard">
          <PointCard />
        </div>

        {/* タイムライン */}
        <div className="timeline">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Post key={post.id} postId={post.id} /> // Postコンポーネントを利用
            ))
          ) : (
            <p>投稿がありません。</p>
          )}
        </div>
      </div>

      <Footer/>
    </div>
  );
}

export default Home;
