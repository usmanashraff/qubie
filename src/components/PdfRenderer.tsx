'use client'
import Papa from 'papaparse';
import * as XLSX from 'xlsx'; // Import the xlsx library

import {
  ChevronDown,
  ChevronUp,
  Loader2,
  RotateCw,
  Search,
  Download,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { toast } from 'sonner'
import { useResizeDetector } from 'react-resize-detector'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import SimpleBar from 'simplebar-react'
import PdfFullscreen from './PdfFullscreen'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


interface PdfRendererProps {
 files:  {
      id: string;
      name: string;
      uploadStatus: 'SUCCESS' | 'FAILED' | 'PENDING'| 'PROCESSING'; // adjust if more statuses exist
      url: string;
      key: string;
      createdAt: Date;
      updatedAt: Date;
      userId: string | null;
      fileGroupId: string | null;
      }[]
}

interface fileInterface {
  id: string;
  name: string;
  uploadStatus: 'SUCCESS' | 'FAILED' | 'PENDING' | 'PROCESSING' ; // adjust if more statuses exist
  url: string;
  key: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
  fileGroupId: string | null;
}
const PdfRenderer = ({ files }: PdfRendererProps) => {
  const [spreadsheetData, setSpreadsheetData] = useState<(string | number)[][]>([]);
  const [numPages, setNumPages] = useState<number>()
  const [currPage, setCurrPage] = useState<number>(1)
  const [scale, setScale] = useState<number>(1)
  const [rotation, setRotation] = useState<number>(0)
  const [renderedScale, setRenderedScale] = useState<number | null>(null)
  const [currentPdf, setCurrentPdf] = useState<number>(0)
  const [fileType, setFileType] = useState<
  'pdf' | 'doc' | 'docx' | 'ppt' | 'pptx' | 'xls' | 'xlsx' | 'txt' | 'csv'
>('pdf')
  const [textContent, setTextContent] = useState<string>('')
  const [loadingText, setLoadingText] = useState(true)  
  const [viewerUrl, setViewerUrl] = useState<string>('')
  const [loadingViewer, setLoadingViewer] = useState(true)
  const [viewerError, setViewerError] = useState(false)

  const isLoading = renderedScale !== scale

  const CustomPageValidator = z.object({
    page: z
      .string()
      .refine((num) => Number(num) > 0 && Number(num) <= numPages!),
  })

  type TCustomPageValidator = z.infer<typeof CustomPageValidator>

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCustomPageValidator>({
    defaultValues: { page: '1' },
    resolver: zodResolver(CustomPageValidator),
  })

  const { width, ref } = useResizeDetector()
   // Add this useEffect to handle files array changes
   useEffect(() => {
    // Reset to first file when files array changes
    setCurrentPdf(0)
  }, [files.length]) // Trigger when file count changes


  useEffect(() => {
    const detectFileType = (filename: string) => {
      const extension = filename.split('.').pop()?.toLowerCase()
      if (extension === 'pdf') return 'pdf'
      if (extension === 'docx') return 'docx'
      if (extension === 'doc') return 'doc'
      if (extension === 'ppt') return 'ppt'
      if (extension === 'pptx') return 'pptx'
      if (extension === 'xls') return 'xls'
      if (extension === 'xlsx') return 'xlsx'
      if (extension === 'csv') return 'csv'
      if (extension === 'txt') return 'txt'
      return 'pdf'
    }

    const type = detectFileType(files[currentPdf].name)
    setFileType(type)
    
    if (type !== 'pdf') {
      if (type === 'txt' || type === 'csv') { // Add CSV to text-based files
        setLoadingText(true)
        fetch(files[currentPdf].url)
          .then(res => res.text())
          .then(text => {
            setTextContent(text)
            setLoadingText(false)
          })
          .catch(() => {
            setViewerError(true)
            setLoadingText(false)
          })
      }
      else if (type === 'xlsx') {
        setLoadingText(true);
        fetch(files[currentPdf].url)
          .then(res => res.arrayBuffer())
          .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData: (string | number)[][] = XLSX.utils.sheet_to_json(worksheet, {
              header: 1,
              defval: '',
            });
            setSpreadsheetData(jsonData);
            setLoadingText(false);
          })
          .catch((error) => {
            console.error('Error parsing XLSX:', error);
            setViewerError(true);
            setLoadingText(false);
          });
      }  
      else {
        // Handle other file types with Google Viewer
        setViewerError(false)
        setLoadingViewer(true)
        const encodedUrl = encodeURIComponent(files[currentPdf].url)
        setViewerUrl(`https://docs.google.com/gview?url=${encodedUrl}&embedded=true`)
      }
    }
  }, [currentPdf, files])

  const handlePageSubmit = ({ page }: TCustomPageValidator) => {
    setCurrPage(Number(page))
    setValue('page', String(page))
  }

  const renderContent = () => {
    if (fileType === 'xlsx') {
      return (
        <div className="w-full min-h-screen border">
          {viewerError ? (
            <div className="flex flex-col items-center justify-center h-full p-4">
              <p className="text-lg text-gray-500 mb-4">
                Preview unavailable - download file instead
              </p>
              <Button asChild>
                <a 
                  href={files[currentPdf].url} 
                  download
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Original File
                </a>
              </Button>
            </div>
          ) : (
            <>
              {loadingText ? (
                <div className='flex justify-center'>
                  <Loader2 className='my-24 h-6 w-6 animate-spin' />
                </div>
              ) : (
                <div className="overflow-auto h-full bg-gray-50 rounded-md p-4">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                      {spreadsheetData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td 
                              key={cellIndex}
                              className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      );
    }

     if (fileType === 'csv') {
    return (
      <div className="w-full min-h-screen border" >
        {viewerError ? (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <p className="text-lg text-gray-500 mb-4">
              Preview unavailable - download file instead
            </p>
            <Button asChild>
              <a 
                href={files[currentPdf].url} 
                download
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download Original File
              </a>
            </Button>
          </div>
        ) : (
          <>
            {loadingText ? (
              <div className='flex justify-center'>
                <Loader2 className='my-24 h-6 w-6 animate-spin' />
              </div>
            ) : (
              <div className="overflow-auto h-full bg-gray-50 rounded-md p-4">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  {Papa.parse(textContent, { skipEmptyLines: true }).data
                    .map((row: any, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell: string, cellIndex: number) => (
                          <td 
                            key={cellIndex}
                            className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          
            )}
          </>
        )}
      </div>
    )
  }

    if (fileType === 'pdf') {
      return (
        <Document
          loading={
            <div className='flex justify-center '>
              <Loader2 className='my-24 h-6 w-6 animate-spin' />
            </div>
          }
          onLoadError={() => toast.error('Error loading PDF')}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          file={files[currentPdf].url}
          className='max-h-full'
        >
          {isLoading && renderedScale ? (
            <Page
              width={width ? width : 1}
              pageNumber={currPage}
              scale={scale}
              rotate={rotation}
              key={'@' + renderedScale}
              renderTextLayer={false} // Disable text layer
              renderAnnotationLayer={false} // Disable annotations

            />
          ) : null}

          <Page
            className={cn(isLoading ? 'hidden' : '')}
            width={width ? width : 1}
            pageNumber={currPage}
            scale={scale}
            rotate={rotation}
            key={'@' + scale}
            renderTextLayer={false} // Disable text layer
            renderAnnotationLayer={false} // Disable annotations
            loading={
              <div className='flex justify-center'>
                <Loader2 className='my-24 h-6 w-6 animate-spin' />
              </div>
            }
            onRenderSuccess={() => setRenderedScale(scale)}
          />
        </Document>
      )
    }


    if (fileType === 'txt') {
      return (
        <div className="w-full min-h-screen border-2">
          {viewerError ? (
            <div className="flex flex-col items-center justify-center h-full p-4">
              <p className="text-lg text-gray-500 mb-4">
                Preview unavailable - download file instead
              </p>
              <Button asChild>
                <a 
                  href={files[currentPdf].url} 
                  download
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Original File
                </a>
              </Button>
            </div>
          ) : (
            <>
              {loadingText ? (
                <div className='flex justify-center'>
                  <Loader2 className='my-24 h-6 w-6 animate-spin' />
                </div>
              ) : (
                <pre className="whitespace-pre-wrap font-mono bg-gray-50 text-black p-4 rounded-md overflow-auto min-h-screen">
                  {textContent}
                </pre>
              )}
            </>
          )}
        </div>
      )
    }
    return (
      <div className="w-full h-full min-h-screen">
        {viewerError ? (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <p className="text-lg text-gray-500 mb-4">
              Preview unavailable - download file instead
            </p>
            <Button asChild>
              <a 
                href={files[currentPdf].url} 
                download
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download Original File
              </a>
            </Button>
          </div>
        ) : (
          <>
            {loadingViewer && (
              <div className='flex justify-center'>
                <Loader2 className='my-24 h-6 w-6 animate-spin' />
              </div>
            )}
            <iframe
              src={viewerUrl}
              className={cn(
                'w-full h-full min-h-screen',
                loadingViewer ? 'hidden' : 'block'
              )}
              frameBorder="0"
              onLoad={() => setLoadingViewer(false)}
              onError={() => {
                setViewerError(true)
                setLoadingViewer(false)
              }}
            />
          </>
        )}
      </div>
    )
  }

  return (
    <div className='w-full rounded-md shadow flex flex-col items-center  -mt-5'>
      <div className='h-14 w-full flex items-center justify-between'>
        <div className='flex items-center gap-1.5 '>
          <div className="w-full flex flex-row gap-2">
            {files && files.map((file: fileInterface, index: number) => (
            <Button
              key={file.id}
              onClick={() => setCurrentPdf(index)}
              variant='secondary'
              className={`text-sm shadow-sm truncate max-w-[100px] rounded-md border ${
                currentPdf === index 
                  ? 'bg-gradient-to-r from-indigo-500/30 to-teal-500/30 border-indigo-200 text-gray-900 dark:text-white' // Active state
                  : 'bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-900 dark:text-gray-100' // Default/hover
              }`}
              title={file.name}
            >
              <span className="truncate font-medium">
                {file.name}
              </span>
            </Button>
            ))}
          </div>
          
          {fileType === 'pdf' && (
            <>
              <Button
                disabled={currPage <= 1}
                onClick={() => {
                  setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1))
                  setValue('page', String(currPage - 1))
                }}
                variant='ghost'
                aria-label='previous page'
              >
                <ChevronDown className='h-4 w-4' />
              </Button>

              <div className='flex items-center gap-1.5'>
                <Input
                  {...register('page')}
                  className={cn(
                    'w-12 h-8',
                    errors.page && 'focus-visible:ring-red-500'
                  )}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSubmit(handlePageSubmit)()
                  }}
                />
                <p className='text-zinc-700 text-sm space-x-1'>
                  <span>/</span>
                  <span>{numPages ?? 'x'}</span>
                </p>
              </div>

              <Button
                disabled={numPages === undefined || currPage === numPages}
                onClick={() => {
                  setCurrPage((prev) => prev + 1 > numPages! ? numPages! : prev + 1)
                  setValue('page', String(currPage + 1))
                }}
                variant='ghost'
                aria-label='next page'
              >
                <ChevronUp className='h-4 w-4' />
              </Button>
            </>
          )}
        </div>

        <div className='space-x-2'>
          {fileType === 'pdf' && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className='gap-1.5' aria-label='zoom' variant='ghost'>
                    <Search className='h-4 w-4' />
                    {scale * 100}%
                    <ChevronDown className='h-3 w-3 opacity-50' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => setScale(1)}>100%</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setScale(1.5)}>150%</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setScale(2)}>200%</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setScale(2.5)}>250%</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                onClick={() => setRotation((prev) => prev + 90)}
                variant='ghost'
                aria-label='rotate 90 degrees'
              >
                <RotateCw className='h-4 w-4' />
              </Button>

              <PdfFullscreen fileUrl={files[currentPdf].url} />
            </>
          )}
        </div>
      </div>

      <div className='flex-1 w-full max-h-screen'>
        <SimpleBar autoHide={false} className='max-h-[calc(100vh-10rem)]'>
          <div ref={ref}>
            {renderContent()}
          </div>
        </SimpleBar>
      </div>
    </div>
  )
}

export default PdfRenderer