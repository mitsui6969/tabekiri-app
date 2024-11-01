export function Home2() {
  const handleNavigate = () => {
    window.location.href = "https://qiita.com/P-man_Brown/items/425518942043e2f6719d";
  };

  return (
    <div>
        <button onClick={handleNavigate}>
        リンクへ飛ぶ
        </button>
    </div>
  );
}

export default Home2;