import React from 'react'

export default function Home() {
  return (
    <div>
      <div className="flex">
        <div className="h-screen w-1/2 bg-black"></div>
        <div className="flex justify-center w-1/2 p-[160px]">
          <div className="flex flex-col w-full max-w-[400px]">
            <div>
              <p>Don't have an account? <a className="text-blue-500 cursor-pointer">Sign up</a></p>
              <h3 className="text-h3 font-semibold">Sign in</h3>
            </div>
            <div className="h-[1px] bg-slate-100 my-24"></div>
            <div className="flex flex-col mb-[24px]">
              <label className="text-h6 font-semibold mb-[8px]">Email Address</label>
              <input type="email" className="px-16 py-12 border-[1px] border-solid border-slate-200 rounded"></input>
            </div>
            <div className="flex flex-col mb-[24px]">
              <div className="flex justify-between items-center mb-[8px]">
                <label className="text-h6 font-semibold">Password</label>
                <a className="text-h6 text-blue-500 underline cursor-pointer">Reset password</a>
              </div>
              <input type="password" className="px-16 py-12 border-[1px] border-solid border-slate-200 rounded"></input>
            </div>
            <button className='w-fit inline-block bg-blue-500 text-white font-semibold px-24 py-16 leading-none rounded duration-100 ease-linear enabled:hover:bg-blue-700 disabled:opacity-50'>Sign in</button>
          </div>
        </div>
      </div>
    </div>
  )
}
