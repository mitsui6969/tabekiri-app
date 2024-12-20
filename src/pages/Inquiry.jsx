import React from "react";
import '../styles/inquiry.css'

export function Inquiry() {
  return (
    <div className="container">
      <div className="info-section">
        <h2>ゼロカーボンシティ推進課</h2>
        <p>金沢市柿木畠1-1 第二本庁舎 1階</p>
        <p>fax.076-260-7193</p>
        <p>
          <a href="mailto:zerocarbon@city.kanazawa.lg.jp">
            zerocarbon@city.kanazawa.lg.jp
          </a>
        </p>
      </div>
    <div className="contact-section">
      <h3>お問い合わせ</h3>
      <p className="phone-number">076-220-2507</p>
      <p className="hours">（受付時間9:00～17:45）</p>
    </div>
    </div>
  );
}

export default Inquiry;
