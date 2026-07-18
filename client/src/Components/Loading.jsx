import React from 'react'

const Loading = () => {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>

                <p className="text-white mt-5 font-semibold">
                    Please wait...
                </p>
            </div>
        </div>
    )
}

export default Loading
