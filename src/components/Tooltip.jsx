import React from 'react'

const Tooltip = ({ message }) => {
    return (
        <div className="min-w-[47px] bg-black opacity-50 text-[#FFF] text-[8px] text-center rounded-[3px] px-1 absolute top-[15px] right-[90%]">
            <span>{message}</span>
        </div>
    )
}

export default Tooltip