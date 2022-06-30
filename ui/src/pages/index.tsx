export default function Home() {
  return (
    <div>
      <div className="flex-col bg-[#FAFBFF]">
        <div className="bg-white border-b-[1px] border-slate-200">
          <div className="flex justify-between max-w-[1440px] mx-auto px-56 py-12">
            <div className="w-1/4"></div>

            <div className="flex justify-center w-half">
              <button className="px-12 py-8 mr-8 rounded hover:bg-slate-200 duration-100 ease-linear">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.375 5.25L8.625 12L15.375 18.75"
                    stroke="#2C2B3C"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>

              <button className="px-12 py-8 mr-12 rounded hover:bg-slate-200 duration-100 ease-linear">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.625 5.25L15.375 12L8.625 18.75"
                    stroke="#2C2B3C"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>

              <button className="flex items-center px-16 py-8 rounded hover:bg-slate-200 duration-100 ease-linear">
                <p className="font-sans text-xl mr-8">June 2022</p>
                <i>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3.0625 5.93942L7.43062 11.0369C7.50103 11.119 7.58837 11.185 7.68665 11.2302C7.78493 11.2753 7.89183 11.2987 8 11.2987C8.10817 11.2987 8.21507 11.2753 8.31334 11.2302C8.41162 11.185 8.49896 11.119 8.56937 11.0369L12.9375 5.93942C13.3544 5.45286 13.0087 4.70129 12.3681 4.70129H3.63062C2.99 4.70129 2.64437 5.45286 3.0625 5.93942Z"
                      fill="#2C2B3C"
                    />
                  </svg>
                </i>
              </button>
            </div>

            <div className="flex w-1/4 justify-end">
              <button className="bg-blue-500 text-white font-semibold px-24 py-8 mr-16 rounded hover:bg-blue-700 duration-100 ease-linear">
                New Expenses
              </button>
              <button className="flex items-center justify-center bg-blue-200 w-[44px] rounded">
                <span className="font-semibold">KB</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mx-auto py-[56px] max-w-[560px]">
          <div className="bg-white height-full border-[1px] rounded-lg">
            <div className="p-16 border-b-[1px]">
              <p className="text-[12.8px] font-semibold ">Total Summary</p>
              <p className="">₱3,000.00</p>
            </div>
            <div className="flex">
              <div className="shrink-0 w-[160px] bg-slate-300 px-16 py-12 text-[12.8px] font-semibold border-r-[1px]">
                Amount
              </div>
              <div className="bg-slate-300 px-16 py-12 text-[12.8px] font-semibold w-full">Description</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
