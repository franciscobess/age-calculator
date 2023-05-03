import React, { useContext } from 'react'
import { DateCalcContext } from './context/DateCalcContext'

const CalcResult = () => {
    const { resultDay, resultMonth, resultYear } = useContext(DateCalcContext)

    return (
        <div className="flex justify-center mt-5">
            <div className='w-[360px] font-extrabold text-[50px] font-poppins'>
                <p><span className='text-[#694aff]'>{resultYear}</span> years</p>
                <p><span className='text-[#694aff]'>{resultMonth}</span> month{(resultMonth === null || resultMonth > 1) && <>s</>} </p>
                <p><span className='text-[#694aff]'>{resultDay}</span> day{(resultDay === null || resultDay > 1) && <>s</>}</p>
            </div>
        </div>
    )
}

export default CalcResult