import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { useContext, useRef } from 'react'
import { ChatContext } from './ChatContext'
import { Send } from "lucide-react"

interface ChatInputProps {
  isDisabled?: boolean
}

const ChatInput = ({ isDisabled }: ChatInputProps) => {
  const {
    addMessage,
    handleInputChange,
    isLoading,
    message,
  } = useContext(ChatContext)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  return (
    <div className='absolute bottom-0 left-0 w-full -mb-5 bg-gradient-to-b from-background via-muted to-background dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'>
      <div className='mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl'>
        <div className='relative flex h-full flex-1 items-stretch md:flex-col'>
          <div className='relative flex flex-col w-full flex-grow p-4'>
            <div className='relative'>
              <Textarea
                rows={1}
                ref={textareaRef}
                maxRows={7}
                autoFocus
                onChange={handleInputChange}
                value={message}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()

                    addMessage()

                    textareaRef.current?.focus()
                  }
                }}
                placeholder="Ask about your documents..."
                className='resize-none text-base py-3 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch dark:bg-slate-800/50 bg-gray-100/90 dark:border-slate-700 border-gray-200 dark:text-white text-gray-900 pr-24 rounded-3xl'
              />

              <Button
                disabled={isLoading || isDisabled}
                className='absolute top-[4px] right-[4px] rounded-full bg-gradient-to-r from-indigo-500 to-teal-500 hover:from-indigo-400 hover:to-teal-400 text-white'
                aria-label='send message'
                onClick={() => {
                  addMessage()

                  textareaRef.current?.focus()
                }}>
                <Send className="h-4 w-4" />
              </Button>
              <p className="text-xs mt-2 text-slate-400 dark:text-slate-400 text-center">
                AI responses are generated based on your uploaded documents
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInput