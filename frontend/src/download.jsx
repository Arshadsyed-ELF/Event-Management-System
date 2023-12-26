import { useRef, useState } from 'react';
import './App.css';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

function App() {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };
  const decrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const pdref = useRef();

  const downloadpdf = () => {
    const input = pdref.current;

    // Additional options to improve clarity
    const options = {
      scale: 10, // Increase scale for higher resolution
      useCORS: true, // Enable Cross-Origin Resource Sharing (CORS) for images
    };

    html2canvas(input, options).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('passes.pdf');
    });
  };

  return (
    <>
      <div ref={pdref}>
        <button onClick={increase} style={{ backgroundColor: 'red' }}>
          Increase
        </button>
        <p>Count: {count}</p>
        <button onClick={decrease} style={{ backgroundColor: 'green' }}>
          Decrease
        </button>
      </div>
      <button onClick={downloadpdf}>Download</button>
    </>
  );
}

export default App;
