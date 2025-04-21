import { Button } from "@/components/ui/button"
import { Play, Upload, FileText, FileSpreadsheet } from "lucide-react"
import Link from 'next/link'

export function Hero() {
  const documentIcons = [
    { icon: <FileText className="text-blue-400" />, delay: 0 },
    { icon: <FileSpreadsheet className="text-green-400" />, delay: 1.5 },
    { icon: <FileText className="text-purple-400" />, delay: 3 },
  ]

  return (
    <section className="relative min-h-screen pt-24 overflow-hidden ">
      {/* Background gradient and effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 z-0" />
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-indigo-900 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-1/3 h-1/3 bg-teal-900 rounded-full filter blur-[100px]" />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] bg-repeat opacity-20 z-0" />
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 pt-0  items-center ">
          {/* Hero content */}
          <div 
            className="flex flex-col space-y-8 "
          >
            <div>
              <div
                className="inline-block px-4 py-1.5 bg-gradient-to-r from-indigo-500/20 to-teal-500/20 backdrop-blur-sm rounded-full mb-6 border border-indigo-500/20"
              >
                <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-teal-400">
                  AI Document Intelligence
                </span>
              </div>
              
              <h1
                className="font-space-grotesk text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-200"
              >
                Revolutionize How You Interact with Documents
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400">—Powered by AI.</span>
              </h1>
              
              <p
                className="text-lg text-slate-300 md:text-xl max-w-xl leading-relaxed"
              >
Upload, converse, conquer—your documents, reimagined.

</p>
            </div>
            
            <div 
              className="flex flex-col sm:flex-row gap-4 md:gap-6"
            >
               <Link
                  href='/dashboard'>
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 text-white border-0 rounded-full px-8 shadow-lg shadow-indigo-900/20 hover:shadow-xl hover:shadow-indigo-700/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started →

              </Button>
                </Link>
              
              <Button
                variant="outline"
                size="lg"
                className="border-slate-700 bg-slate-900/50 backdrop-blur-sm text-slate-200 hover:bg-slate-800 rounded-full px-8 flex items-center gap-2"
              >
                <Play className="h-4 w-4" /> Watch Demo Video
              </Button>
            </div>
          </div>
          
          {/* Hero visual/3D interface */}
          <div 
            className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg">
              {/* Chat Interface */}
              <div 
                className="absolute w-full h-[400px] bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-lg rounded-xl border border-slate-700/50 shadow-2xl overflow-hidden p-4"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/50">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-teal-400 flex items-center justify-center">
                        <Upload className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-medium text-white">Annual Report.pdf</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                      <div className="h-2 w-2 rounded-full bg-teal-400"></div>
                      <div className="h-2 w-2 rounded-full bg-slate-600"></div>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  <div className="bg-slate-800 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm text-slate-300">Can you summarize the key financial metrics from Q3?</p>
                    </div>
                  <div className="bg-gradient-to-r from-indigo-500/20 to-teal-500/20 rounded-lg p-3 ml-auto max-w-[80%]">
                      <p className="text-sm text-white">In Q3, revenue increased by 24% YoY to $14.2M. EBITDA margin improved to 32% (up from 28% in Q2). Cash flow from operations was $3.8M, and customer acquisition cost decreased by 18%.</p>
                    </div>
                   
                    
                    
                    
                    <div className="bg-slate-800 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm text-slate-300">What were the main drivers for the revenue increase?</p>
                    </div>
                    
                    <div 
                      className="bg-gradient-to-r from-indigo-500/20 to-teal-500/20 rounded-lg p-3 ml-auto max-w-[80%]"
                    >
                      <p className="text-sm text-white">The main drivers were: 1) 38% growth in enterprise customers, 2) expansion of the product suite with two new API offerings, and 3) international market penetration increasing from 18% to 27% of total revenue.</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-slate-700/50 pt-3">
                    <div className="bg-slate-800 rounded-full p-2 pl-4 flex items-center">
                      <input
                        type="text"
                        placeholder="Ask about your document..."
                        className="bg-transparent border-none outline-none flex-1 text-sm text-slate-300"
                      />
                      <Button size="sm" className="rounded-full bg-gradient-to-r from-indigo-500 to-teal-400 hover:from-indigo-400 hover:to-teal-300">
                        Ask
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating document icons */}
              {documentIcons.map((doc, i) => (
                <FloatingDocument 
                  key={i} 
                  icon={doc.icon} 
                  delay={doc.delay}
                  style={{
                    position: 'absolute',
                    top: `${20 + (i * 10)}%`,
                    left: i % 2 === 0 ? '10%' : '80%',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-slate-500 flex justify-center pt-2">
          <div 
            className="w-1.5 h-1.5 rounded-full bg-teal-400"
          />
        </div>
      </div>
    </section>
  )
}

function FloatingDocument({ icon, delay, style }: { icon: React.ReactNode, delay: number, style?: React.CSSProperties }) {
  return (
    <div
      className="absolute flex items-center justify-center"
      style={style}
    >
      <div className="h-12 w-10 border border-slate-700/70 bg-slate-800/90 backdrop-blur-sm rounded flex items-center justify-center">
        {icon}
      </div>
    </div>
  )
}