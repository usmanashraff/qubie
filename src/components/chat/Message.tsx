"use client"
import { cn } from '@/lib/utils'
import { ExtendedMessage } from '@/types/message'
import { Icons } from '../Icons'
import ReactMarkdown from 'react-markdown'
import { format } from 'date-fns'
import { forwardRef } from 'react'
import { Bot,  } from "lucide-react"

interface MessageProps {
  message: ExtendedMessage
  isNextMessageSamePerson: boolean,
}

const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ message, isNextMessageSamePerson }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-end', {
          'justify-end': message.isUserMessage,
        })}>
        <div
          className={cn(
            'relative flex h-6 w-6 aspect-square items-center justify-center',
            {
              'order-2 bg-slate-100 dark:bg-slate-800 rounded-sm':
                message.isUserMessage,
              'order-1 bg-gradient-to-b from-indigo-500 to-teal-500 dark:from-slate-800 dark:to-slate-950 rounded-sm':
                !message.isUserMessage,
              invisible: isNextMessageSamePerson,
            }
          )}>
          {message.isUserMessage ? (
                <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0">
                  <div className="h-4 w-4 rounded-full bg-gradient-to-r from-indigo-400 to-teal-400" />
                </div>
                ) : (
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-5 w-5 text-white" />
                </div>          
          )}
        </div>

        <div
          className={cn(
            'flex flex-col space-y-2 text-base max-w-md mx-2',
            {
              'order-1 items-end': message.isUserMessage,
              'order-2 items-start': !message.isUserMessage,
            }
          )}>
          <div
            className={cn(
              'px-4 py-2 rounded-lg inline-block',
              {
                'bg-gradient-to-r from-indigo-500/10 to-teal-500/10 dark:from-indigo-500/20 dark:to-teal-500/20 ml-auto text-gray-800 dark:text-zinc-100 rounded-3xl': message.isUserMessage,
                'bg-gray-100/90 dark:bg-slate-800/50 text-gray-800 dark:text-zinc-100 rounded-3xl': !message.isUserMessage,
                'rounded-br-none': !isNextMessageSamePerson && message.isUserMessage,
                'rounded-bl-none': !isNextMessageSamePerson && !message.isUserMessage,
              }
            )}>
            {typeof message.text === 'string' ? (
            <div className={cn('prose break-words', {
              'prose-invert': !message.isUserMessage,
              'text-gray-800 dark:text-zinc-100': true,
            })}>
              <ReactMarkdown
                components={{
                  // Force all text elements to inherit color
                  strong: ({node, ...props}) => <strong {...props} className="text-inherit" />,
                  h1: ({node, ...props}) => <h1 {...props} className="text-inherit" />,
                  h2: ({node, ...props}) => <h2 {...props} className="text-inherit" />,
                  h3: ({node, ...props}) => <h3 {...props} className="text-inherit" />,
                  h4: ({node, ...props}) => <h4 {...props} className="text-inherit" />,
                  h5: ({node, ...props}) => <h5 {...props} className="text-inherit" />,
                  h6: ({node, ...props}) => <h6 {...props} className="text-inherit" />,
                  a: ({node, ...props}) => (
                    <a {...props} className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 underline" target="_blank" />
                  ),
                  code: ({node, ...props}) => (
                    <code {...props} className="bg-gray-200/50 dark:bg-black/30 rounded-md px-1 py-0.5 text-inherit" />
                  ),
                }}
              >
                {message.text}
              </ReactMarkdown>
            </div>
            ) : (
              message.text
            )}
            {message.id !== 'loading-message' ? (
              <div
                className={cn(
                  'text-xs select-none mt-2 w-full text-right',
                  {
                    'text-gray-500 dark:text-zinc-300/80': !message.isUserMessage,
                    'text-gray-500 dark:text-zinc-200/80': message.isUserMessage,
                  }
                )}>
                {format(
                  new Date(message.createdAt),
                  'HH:mm'
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
)

Message.displayName = 'Message'

export default Message