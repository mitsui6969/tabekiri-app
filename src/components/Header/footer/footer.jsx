import './CircleButton.css';

export function Home() {
    const handleClick = () => {
      alert("QRコードボタンがクリックされました！");
    };
    
  
    return (
      <div className="background-bar">
            <div className="circle-button" onClick={handleClick}>
                <img src="https://via.placeholder.com/60x60.png?text=QR" alt="QR Code" />
            </div>
      </div>
      
    );
  }
  
  
  export default Home;