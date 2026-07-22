import React from 'react'
const CommonTemplate = ({ props }) => {
    return (
        <div className="w-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2">

                {/* Left Section */}
                <div className="flex flex-col justify-center items-center p-8 bg-gradient-to-br from-red-500 to-red-700 text-white">
                    <h2 className="text-3xl font-bold text-center">
                        {props.Texts}
                    </h2>

                    <button className="mt-6 px-6 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition duration-300" onClick={props.onClicked}>
                        {props.btnText}
                    </button>
                </div>

                {/* Right Section */}
                <div className="flex items-center p-8">
                    <p className="text-gray-600 leading-7 text-lg">
                        {props.moreInfo}
                    </p>
                </div>

            </div>
        </div>
    )
}

export default CommonTemplate