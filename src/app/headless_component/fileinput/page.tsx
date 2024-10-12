"use client";

import React, { useState, useRef } from "react";
import { FileTrigger, Button, Text, Label } from "react-aria-components";

// 基本的なファイルトリガーコンポーネント
function BasicFileTrigger() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  return (
    <div>
      <FileTrigger
        onSelect={(files: FileList | null) => {
          if (files) {
            setSelectedFile(
              Array.from(files)
                .map((file) => file.name)
                .join(", "),
            );
          }
        }}
      >
        <Button>Select File</Button>
      </FileTrigger>
      {selectedFile && <Text>Selected file: {selectedFile}</Text>}
    </div>
  );
}

// 受け取るファイル形式を制御できる。
// ariaを使うと半分くらいのコード量でアクセシブルな機能を提供できる。
function CustomFileTrigger() {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  return (
    <div>
      <FileTrigger
        onSelect={(files: FileList | null) => {
          if (files) {
            setSelectedFiles(Array.from(files).map((file) => file.name));
          }
        }}
        acceptedFileTypes={[".jpg", ".png", ".gif"]}
      >
        <Button
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
          }}
        >
          Upload Image
        </Button>
      </FileTrigger>
      {selectedFiles.length > 0 && (
        <div>
          <Label>Selected files:</Label>
          <ul>
            {selectedFiles.map((fileName, index) => (
              <li key={index}>{fileName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ariaを使わない場合、長い...
// イベントハンドラーを自前で用意する必要がある。
function CustomFileTriggerNoAria() {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(Array.from(files).map((file) => file.name));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleButtonClick();
    }
  };

  return (
    <div>
      <button
        onClick={handleButtonClick}
        onKeyDown={handleKeyDown}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
        }}
        aria-label="Upload Image"
        role="button"
        tabIndex={0}
      >
        Upload Image
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".jpg,.png,.gif"
        style={{ display: "none" }}
        aria-hidden="true"
      />
      {selectedFiles.length > 0 && (
        <div>
          <label id="selected-files-label">Selected files:</label>
          <ul aria-labelledby="selected-files-label">
            {selectedFiles.map((fileName, index) => (
              <li key={index}>{fileName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// メインのアプリケーションコンポーネント
function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>File Trigger Examples with react-aria-components</h1>

      <h2>Basic File Trigger</h2>
      <BasicFileTrigger />

      <h2>Custom File Trigger</h2>
      <CustomFileTrigger />

      <h2>Custom File Trigger no Aria</h2>
      <CustomFileTriggerNoAria />
    </div>
  );
}

export default App;
