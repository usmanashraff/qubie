"use client"
import { cn } from '@/lib/utils'
import { ExtendedMessage } from '@/types/message'
import { Icons } from '../Icons'
import ReactMarkdown from 'react-markdown'
import { format } from 'date-fns'
import { forwardRef } from 'react'

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
              'order-2 bg-slate-800 rounded-sm':
                message.isUserMessage,
              'order-1 bg-gradient-to-b from-slate-800 to-slate-950 rounded-sm':
                !message.isUserMessage,
              invisible: isNextMessageSamePerson,
            }
          )}>
          {message.isUserMessage ? (
            <Icons.user className='fill-zinc-200 text-zinc-200 h-3/4 w-3/4' />
          ) : (
            <Icons.logo className='fill-zinc-300 h-3/4 w-3/4' />
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
                'bg-slate-900 text-zinc-100': message.isUserMessage,
                'bg-gradient-to-r from-indigo-500/20 to-teal-500/20 text-zinc-100': !message.isUserMessage,
                'rounded-br-none': !isNextMessageSamePerson && message.isUserMessage,
                'rounded-bl-none': !isNextMessageSamePerson && !message.isUserMessage,
              }
            )}>
            {typeof message.text === 'string' ? (
            <div className={cn('prose break-words', {
              'prose-invert': message.isUserMessage,
              'text-zinc-100': true,
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
                    <a {...props} className="text-blue-400 hover:text-blue-300 underline" target="_blank" />
                  ),
                  code: ({node, ...props}) => (
                    <code {...props} className="bg-black/30 rounded-md px-1 py-0.5 text-inherit" />
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
                    'text-zinc-300/80': !message.isUserMessage,
                    'text-zinc-200/80': message.isUserMessage,
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