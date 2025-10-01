import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// PDF.jsのワーカーを設定
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  url: string;
  alt?: string;
}

export default function PDFViewer({ url, alt }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setError(null);
  }

  function onDocumentLoadError(error: Error) {
    console.error('Error loading PDF:', error);
    setError('PDFの読み込みに失敗しました');
  }

  function changePage(offset: number) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  if (error) {
    return (
      <div className="my-8 p-8 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{alt || url}</p>
      </div>
    );
  }

  return (
    <div className="my-8 flex flex-col items-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={
            <div className="flex items-center justify-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="max-w-full"
            width={Math.min(800, typeof window !== 'undefined' ? window.innerWidth - 64 : 800)}
          />
        </Document>
      </div>

      {numPages > 1 && (
        <div className="mt-4 flex items-center gap-4">
          <button
            type="button"
            onClick={previousPage}
            disabled={pageNumber <= 1}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="前のページ"
          >
            <ChevronLeft size={24} />
          </button>

          <p className="text-sm text-gray-700 dark:text-gray-300">
            Page {pageNumber} / {numPages}
          </p>

          <button
            type="button"
            onClick={nextPage}
            disabled={pageNumber >= numPages}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="次のページ"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      {alt && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center italic">
          {alt}
        </p>
      )}
    </div>
  );
}
