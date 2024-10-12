"use client";

import { NextPage } from "next";
import React, { useRef } from "react";
import { useButton } from "@react-aria/button";

// React Aria を使用したボタン
interface AccessibleButtonProps {
  onPress: () => void;
  children: React.ReactNode;
}

const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  onPress,
  children,
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton({ onPress }, ref);

  return (
    <button {...buttonProps} ref={ref} style={buttonStyle}>
      {children}
    </button>
  );
};

// 通常のReactボタン
interface RegularButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const RegularButton: React.FC<RegularButtonProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} style={buttonStyle}>
      {children}
    </button>
  );
};

// 共通のスタイル
const buttonStyle: React.CSSProperties = {
  padding: "10px 20px",
  fontSize: "16px",
  margin: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  background: "#f0f0f0",
  cursor: "pointer",
};

const ComparisonPage: NextPage = () => {
  const handleClick = (buttonType: string) => {
    alert(`${buttonType} ボタンがクリックされました！`);
  };

  return (
    <div style={{ margin: "20px" }}>
      <div>
        <h2>React Aria を使用したボタン</h2>
        <AccessibleButton onPress={() => handleClick("React Aria")}>
          React Aria ボタン
        </AccessibleButton>
      </div>
      <div>
        <h2>通常の React ボタン</h2>
        <RegularButton onClick={() => handleClick("通常の React")}>
          通常の React ボタン
        </RegularButton>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>比較ポイント:</h3>
        <ul>
          <li>キーボード操作の違い（Tabキーでフォーカス、Enterキーで実行）</li>
          <li>スクリーンリーダーでの読み上げ</li>
          <li>デフォルトのARIA属性の有無</li>
        </ul>
      </div>
    </div>
  );
};

export default ComparisonPage;
