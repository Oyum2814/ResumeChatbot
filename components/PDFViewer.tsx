// Responsible for rendering of the PDF
import React, { useState, useEffect, useRef } from 'react';
import { Document as Doc, Page as Pag, pdfjs } from 'react-pdf'; // Used for rendering of PDF, not the actual creation of the PDF itself. That is taken care by @react-pdf/renderer which is used in Template.js 

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
interface Props {
  doc: any; // You should replace 'any' with the type of your 'doc' prop
}

const PDFViewer: React.FC<Props> = ({doc}) => {
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const sourceCanvasRef = useRef<HTMLCanvasElement | null>(null); // Keep track of the INTERNAL canvas used by the renderer. We use this as a buffer. The actual preview on the webpage is done by another canvas.

  const [canvasDimensions, setCanvasDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
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

  const updateCanvasDimensions = async () => {
    try {
      const pdfDocument = doc;

      if (pdfDocument) {
        const page = await pdfDocument.getPage(1); // Get the first page
        const viewport = page.getViewport({ scale: 1 }); // Get the viewport

        setCanvasDimensions({ width: viewport.width, height: viewport.height });
      }
    } catch (error) {
      console.error('Error updating canvas dimensions:', error);
    }
  };
  // Re-render the PDF once the input changes
  useEffect(() => {
    generatePdf();
  }, [doc]);
  

  // Used for double buffer, to prevent jitter when the input updates
  useEffect(() => {
    if (loading) return;

    const sourceCanvas = sourceCanvasRef.current; // The canvas used as a buffer
    const targetCanvas = document.getElementById('targetCanvas') as HTMLCanvasElement | null; // The actual canvas displayed on the webpage, once the buffer canvas is rendered, we copy the contents here. This avoids jitter caused by PDF refresh
    if (sourceCanvas == null ) return;

    const targetCtx = targetCanvas?.getContext('2d');

    // Copy the content from the source canvas to the target canvas
    targetCtx?.drawImage(sourceCanvas, 0, 0);
  }, [loading]);

  useEffect(() => {
    updateCanvasDimensions();
    console.log("Updated Dimensions");
  }, [pdfUrl]);

  return (
    <div className="pdf-viewer h-screen overflow-y-auto  w-[100%] md:w-[50%]  md:bg-gray-500 
    flex flex-row md:flex-col justify-center items-center relative">
      <div className='pdf-layout'>
        <div> 
          <canvas className='RenderCanvas
          h-screen w-[50vw]
          scale-[70%]
          '
          id="targetCanvas" 
          height="1782" width="1470"
            ></canvas>
        </div>
        <div style={{ display: 'none' }}>
          <Doc file={pdfUrl} >
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
          {loading ? 'Compiling...' : 'Download PDF'}
        </a>
      </div>
    </div>
  );
}

export default PDFViewer;
