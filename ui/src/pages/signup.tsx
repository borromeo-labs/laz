import React from 'react'

export default function Home() {
  return (
    <div>
      <div className="flex">
        <div className="h-screen w-1/2 bg-black"></div>
        <div className="flex justify-center w-1/2 p-[160px]">
          <div className="flex flex-col w-full max-w-[400px]">
            <div>
              <h3 className="text-h3 font-semibold">Create an account</h3>
              <p>Already have an account? <a className="text-blue-500 cursor-pointer">Sign in</a></p>
            </div>
            <div className="h-[1px] bg-slate-100 my-24"></div>
            <div className="flex flex-col mb-[24px]">
              <label className="text-h6 font-semibold mb-[8px]">Email Address</label>
              <input type="email" className="px-16 py-12 border-[1px] border-solid border-slate-200 rounded"></input>
            </div>
            <div className="flex flex-col mb-[24px]">
              <label className="text-h6 font-semibold mb-[8px]">Name</label>
              <input type="email" className="px-16 py-12 border-[1px] border-solid border-slate-200 rounded"></input>
            </div>
            <div className="flex flex-col mb-[24px]">
              <label className="text-h6 font-semibold">Password</label>
              <input type="password" className="px-16 py-12 border-[1px] border-solid border-slate-200 rounded"></input>
            </div>
            <div className="flex flex-col mb-[24px]">
              <label className="text-h6 font-semibold">Confirm Password</label>
              <input type="password" className="px-16 py-12 border-[1px] border-solid border-slate-200 rounded"></input>
            </div>
            <button className='w-fit inline-block bg-blue-500 text-white font-semibold px-24 py-16 leading-none rounded duration-100 ease-linear enabled:hover:bg-blue-700 disabled:opacity-50'>Create Account</button>
          </div>
        </div>
      </div>
    </div>
  )
}
