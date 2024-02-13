// Responsible for rendering of the PDF
import React, { useState, useEffect, useRef } from 'react';
import { Document as Doc, Page as Pag, pdfjs } from 'react-pdf'; // Used for rendering of PDF, not the actual creation of the PDF itself. That is taken care by @react-pdf/renderer which is used in Template.js 
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



interface PDFViewerProps{
  doc?:any
  info?:any;
  experiences?:any;
  projects?:any;
  educations?:any;
  skills?:any;
  socials?:any;
}
const PDFViewer: React.FC<PDFViewerProps> = ({doc,info,experiences,projects,educations,skills,socials}) => {
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const sourceCanvasRef = useRef<HTMLCanvasElement | null>(null); // Keep track of the INTERNAL canvas used by the renderer. We use this as a buffer. The actual preview on the webpage is done by another canvas.

  // Function to generate the PDF
  const generatePdf = async () => {
    try {
      // Create a PDF document
      const pdfDocument = doc;
      
      // Check if the document is created successfully
      if (pdfDocument) {
        const blob = await pdfDocument.toBlob();
        
        // Check if the blob is created successfully
        if (blob) {
          // Create a URL for the blob
          const url = URL.createObjectURL(blob);
          
          // Set the URL in the state
          setPdfUrl(url);
        } else {
          console.error('Error creating PDF blob');
        }
      } else {
        console.error('Error creating PDF document');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      // Perform any cleanup or finalization if needed
      // setLoading(false);
    }
  };

  // Re-render the PDF once the input changes
  useEffect(() => {
    console.log("Generating PDF");
    generatePdf();
  }, [doc,info,experiences,projects,educations,skills,socials]);
  

  // Used for double buffer, to prevent jitter when the input updates
  useEffect(() => {
    if (loading && !pdfUrl) return;

    const sourceCanvas = sourceCanvasRef.current; // The canvas used as a buffer
    const targetCanvas = document.getElementById('targetCanvas') as HTMLCanvasElement | null; // The actual canvas displayed on the webpage, once the buffer canvas is rendered, we copy the contents here. This avoids jitter caused by PDF refresh
    if (sourceCanvas == null ) return;

    const targetCtx = targetCanvas?.getContext('2d');

    // Copy the content from the source canvas to the target canvas
    targetCtx?.drawImage(sourceCanvas, 0, 0);
  }, [loading,pdfUrl]);


  return (
    <div className="pdf-viewer h-screen overflow-scroll  w-[100%] md:w-[50%]  md:bg-gray-500 
    flex flex-row md:flex-col justify-center items-center relative">
      <div className='pdf-layout'>
        {/* <div> 
          <canvas className='RenderCanvas
         
          scale-[30%] 
          '
          id="targetCanvas" 
          height="1782" width="1470"
            ></canvas>
        </div> */}
        <div className="scale-[75%] ">
          <Doc file={pdfUrl}
           loading={() => {
              setLoading(true);
              return <div>Loading</div>;
            }} >
            <Pag 
            canvasRef={(canvas) => {
              if (canvas) sourceCanvasRef.current = canvas;
                }} // Keeps track of the loading state of renderer
              onRenderSuccess={() => { setLoading(false) }} // Once rendered we can change loading to false and update buffer
              pageNumber={1} />
          </Doc>
        </div>
        <a className="download-btn absolute bottom-10 left-40 right-40 mx-auto
         text-white bg-blue-600 px-4 py-2 font-bold rounded-md text-center" 
         href={pdfUrl} download="generated_pdf.pdf"> {/*Directly use the blob url to download PDF*/ }
          {loading ? 'Compiling...' : 'Save as PDF'}
        </a>
      </div>
    </div>
  );
}

export default PDFViewer;
