import { useState } from "react"
import CalcResult from "./components/CalcResult"
import InputDateForm from "./components/InputDateForm"
import { DateCalcContext } from "./components/context/DateCalcContext"

function App() {
  const [validDay, setValidDay] = useState(true)
  const [validMonth, setValidMonth] = useState(true)
  const [validYear, setValidYear] = useState(true)
  const [resultDay, setResultDay] = useState("--")
  const [resultMonth, setResultMonth] = useState("--")
  const [resultYear, setResultYear] = useState("--")

  const state = {
    validDay,
    setValidDay,
    validMonth,
    setValidMonth,
    validYear,
    setValidYear,
    resultDay,
    setResultDay,
    resultMonth,
    setResultMonth,
    resultYear,
    setResultYear
  }

  return (
    <DateCalcContext.Provider value={state}>
      <InputDateForm />
      <CalcResult />
    </DateCalcContext.Provider>
  )
}

export default App
