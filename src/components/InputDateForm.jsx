import { useContext, useRef, useState } from "react";
import arrowDown from './assets/icon-arrow.svg'
import { BiReset } from "react-icons/bi";
import Tooltip from "./Tooltip";
import { DateCalcContext } from "./context/DateCalcContext";

const InputDateForm = () => {
    const { validDay, setValidDay, validMonth, setValidMonth, validYear, setValidYear, setResultDay, setResultMonth, setResultYear } = useContext(DateCalcContext)
    const [showToolTip, setShowToolTip] = useState(false)
    const dayRef = useRef(null)
    const monthRef = useRef(null)
    const yearRef = useRef(null)

    const thisDayIsValid = (day) => {
        if (day > 0 && day <= 31) {
            return true
        }

        return false
    }

    const thisMonthIsValid = (month) => {
        if (month > 0 && month <= 12) {
            return true
        }

        return false
    }

    const thisYearIsValid = (year) => {
        const currentYear = new Date().getFullYear()

        if (year < currentYear) {
            return true
        }

        return false
    }

    const clearInputFields = () => {
        dayRef.current.value = ""
        monthRef.current.value = ""
        yearRef.current.value = ""
    }

    const aniversaryAlreadyPassed = (completeBirthDate) => {
        const birthDate = new Date(completeBirthDate)
        const currentDate = new Date()

        if (currentDate.getMonth() > birthDate.getMonth() || currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() > birthDate.getDate()) {
            return true
        }

        return false
    }

    const daysDiff = (completeBirthDate) => {
        const birthDate = new Date(completeBirthDate)
        const currentDate = new Date()

        if (aniversaryAlreadyPassed(birthDate)) {
            return 31 + currentDate.getDate() - birthDate.getDate()
        }

        return birthDate.getDate() - currentDate.getDate()
    }

    const monthsDiff = (completeBirthDate) => {
        const birthDate = new Date(completeBirthDate)
        const currentDate = new Date()
        const currentMonth = currentDate.getMonth() + 1
        const birthMonth = birthDate.getMonth() + 1

        if (aniversaryAlreadyPassed(birthDate)) {
            return currentMonth - birthMonth
        }

        return 12 - (birthMonth - currentMonth)

    }

    const yearsDiff = (completeBirthDate) => {
        const birthDate = new Date(completeBirthDate)
        const currentDate = new Date()

        if (currentDate.getMonth() <= birthDate.getMonth() && currentDate.getDate() < birthDate.getDate() || currentDate.getMonth() < birthDate.getMonth()) {
            return (currentDate.getFullYear() - birthDate.getFullYear() - 1)
        }

        return currentDate.getFullYear() - birthDate.getFullYear()
    }

    const formSubmitHandler = (event) => {
        event.preventDefault()

        const day = event.target.day.value
        const month = event.target.month.value
        const year = event.target.year.value
        let [localValidDay, localValidMonth, localValidYear] = [true, true, true]
        const birthDate = `${month}/${day}/${year}`

        if (!thisDayIsValid(day)) {
            localValidDay = false
            setValidDay(false)
        } else {
            setValidDay(true)
        }

        if (!thisMonthIsValid(month)) {
            localValidMonth = false
            setValidMonth(false)
        } else {
            setValidMonth(true)
        }

        if (!thisYearIsValid(year)) {
            localValidYear = false
            setValidYear(false)
        } else {
            setValidYear(true)
        }

        if (localValidDay && localValidMonth && localValidYear) {
            setResultYear(yearsDiff(birthDate))
            setResultMonth(monthsDiff(birthDate))
            setResultDay(daysDiff(birthDate))
        }
    }

    return (
        <div className="mt-[100px]">
            <form className="flex justify-center" onSubmit={formSubmitHandler}>
                <div className="relative inline-block">
                    {showToolTip && <Tooltip message="Clear fields" show={showToolTip} />}

                    <BiReset
                        className="mt-6 mr-2 text-[#694aff] hover:cursor-pointer"
                        onClick={clearInputFields}
                        onMouseEnter={() => setShowToolTip(true)}
                        onMouseLeave={() => setShowToolTip(false)}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="day" className={`label-date text-gray-500`}>DAY</label>
                    <input type="number" id="day" placeholder="DD" min="1" max="" required className="input-date" ref={dayRef}></input>
                    {!validDay && <p className={`text-[8px] mt-1 text-red-500`}>Must be a valid day</p>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="month" className={`label-date text-gray-500 ml-3`}>MONTH</label>
                    <input type="number" id="month" placeholder="MM" required className="input-date ml-3" ref={monthRef}></input>
                    {!validMonth && <p className={`text-[8px] mt-1 ml-3 text-red-500`}>Must be a valid month</p>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="year" className={`label-date text-gray-500 ml-3`}>YEAR</label>
                    <input type="number" id="year" placeholder="YYYY" required className="input-date ml-3" ref={yearRef}></input>
                    {!validYear && <p className={`text-[8px] mt-1 ml-3 text-red-500`}>Must be a valid year</p>}
                </div>
                <button type="submit" className="rounded-full w-[45px] h-[45px] bg-[#694aff] text-white ml-6 mt-16 flex justify-center items-center hover:cursor-pointer">
                    <img src={arrowDown} alt="arrow down submit" className="w-6" />
                </button>
            </form>
        </div>
    )
}

export default InputDateForm