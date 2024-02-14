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
    <div className="pdf-viewer h-screen overflow-y-scroll overflow-x-hidden  w-[100%] md:w-[50%]  
    flex flex-row md:flex-col justify-center items-center relative">
      <div className='pdf-layout w-full h-full  flex flex-col justify-center  items-center'>
        {/* <div> 
          <canvas className='RenderCanvas
         
          scale-[30%] 
          '
          id="targetCanvas" 
          height="1782" width="1470"
            ></canvas>
        </div> */}
        <div className="scale-[50%] md:scale-[75%] shadow-xl border-[1px] ">
          <Doc file={pdfUrl}
           loading={() => {
              setLoading(true);
              return (
                <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
              )
              // return <div className="manrope text-2xl text-white">Loading</div>;
            }} >
            <Pag 
            canvasRef={(canvas) => {
              if (canvas) sourceCanvasRef.current = canvas;
                }} // Keeps track of the loading state of renderer
              onRenderSuccess={() => { setLoading(false) }} // Once rendered we can change loading to false and update buffer
              pageNumber={1} />
          </Doc>
          
        </div>
        <a className="download-btn -mt-[12%]
          text-white bg-blue-600 px-4 py-2 font-bold w-[50vw] md:w-[20vw] rounded-md text-center" 
          href={pdfUrl} download="generated_pdf.pdf"> {/*Directly use the blob url to download PDF*/ }
            {loading ? 'Compiling...' : 'Save as PDF'}
          </a>
          
      </div>
    </div>
  );
}

export default PDFViewer;
