import React, { useState, useRef, useEffect } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import './Scanner.css'; // Import custom CSS for styling
import swal from 'sweetalert'; // Import SweetAlert library

const QRCodeScanner = () => {
  const [result, setResult] = useState('');
  const codeReaderRef = useRef(null);

  const handleScan = (result) => {
    if (result) {
      setResult(result.text);
      showQRCodeDetectedAlert(result.text); // Show SweetAlert when QR code is detected
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const showQRCodeDetectedAlert = (qrCodeText) => {
    swal('QR Code Detected', 'success');
  };

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;

    const videoElement = document.getElementById('videoElement');
    if (videoElement) {
      codeReader.decodeFromVideoElement(videoElement, handleScan, handleError);
      codeReader.decodeOnceFromVideoDevice(undefined, 'videoElement')
        .then(handleScan)
        .catch(handleError);
    }

    return () => {
      if (codeReaderRef.current) {
        codeReaderRef.current.reset();
      }
    };
  }, []);

  return (
    <div className="scanner-container">
      <h1>QR Code Scanner</h1>
      <video id="videoElement" className="video-element" autoPlay></video>
      <p>{result}</p>
    </div>
  );
};

export default QRCodeScanner;
