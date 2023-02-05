import React from 'react'
import cx from 'classnames'
import { IoAddSharp } from 'react-icons/io5'

const Skeleton = ({ h, w, bg = 100 }: { h: number; w: number; bg?: number }) => {
  const className = cx('animate-pulse rounded', {
    'bg-neutral-300': bg === 100,
    'bg-neutral-400': bg === 300,
  })

  return <div className={className} style={{ height: h, width: w }} />
}

const MONTH_PLACEHOLDER = [null, null, null, null]

const ExpenseMonthSkeleton: React.FC = () => {
  return (
    <>
      <div className="relative">
        <div className="py-56">
          <div className="relative mx-auto max-w-[560px]">
            {MONTH_PLACEHOLDER.map((_, i) => (
              <div className="relative mb-[56px]" key={i}>
                <div className="absolute -left-[360px] flex items-center">
                  <div className="mr-[24px] flex w-[160px] justify-end">
                    <Skeleton h={16} w={80} />
                  </div>
                  <div className="z-month-page-timeline-circle h-12 w-12 rounded-full bg-primary-500 outline outline-8 outline-[#F8FAFC]"></div>
                </div>

                <div className="height-full rounded-lg border border-neutral-300 bg-white">
                  {/* Panel Header */}
                  <div className="border-b border-neutral-400 p-16">
                    <Skeleton h={12} w={80} />
                    <div className="mb-8" />
                    <Skeleton h={14} w={120} />
                  </div>

                  {/* Table Heading */}
                  <div className="wrap flex border-b border-neutral-400">
                    <div className="w-[160px] shrink-0 border-r border-neutral-400 bg-neutral-200 px-16 py-12">
                      <Skeleton h={14} w={80} bg={300} />
                    </div>
                    <div className="w-full bg-neutral-200 py-12 px-16">
                      <Skeleton h={14} w={80} bg={300} />
                    </div>
                  </div>

                  <div className="flex w-full items-center p-8 text-neutral-500">
                    <IoAddSharp className="mr-8" size="20" />
                    <Skeleton h={16} w={120} />
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute top-0 bottom-0 -left-[171px] w-px bg-neutral-200"></div>
          </div>

          <div className="absolute top-0 bottom-0 left-0 right-0 z-month-page-skeleton-fade">
            <div
              className="h-full"
              style={{ background: 'linear-gradient(0deg, rgba(250,251,255,1) 10%, rgba(0,212,255,0) 100%)' }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export { ExpenseMonthSkeleton }
