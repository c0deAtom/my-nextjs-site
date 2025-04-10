'use client'

import { useEffect, useState } from 'react'

const questions = [
  { id: 'EI', text: 'Do you prefer group activities over spending time alone?' },
  { id: 'SN', text: 'Do you rely more on facts than ideas?' },
  { id: 'TF', text: 'Do you make decisions based on logic more than emotions?' },
  { id: 'JP', text: 'Do you prefer planned routines over spontaneity?' },
  { id: 'EI', text: 'Do you enjoy being the center of attention?' },
  { id: 'SN', text: 'Do you focus more on present details than future possibilities?' },
  { id: 'TF', text: 'Is fairness more important than compassion?' },
  { id: 'JP', text: 'Do you like to have things decided rather than go with the flow?' }
]

const MBTIQuestionnaire = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [mbti, setMbti] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('mbtiAnswers')
    if (saved) {
      const parsed = JSON.parse(saved)
      setAnswers(parsed)
      setCurrentIndex(Object.keys(parsed).length)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('mbtiAnswers', JSON.stringify(answers))
    if (Object.keys(answers).length === questions.length) {
      calculateMBTI()
    }
  }, [answers])


  const handleAnswer = (choice: string) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: choice }))
    setCurrentIndex((prev) => prev + 1)
  }

  
  const calculateMBTI = () => {
    const traits = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
    

    questions.forEach((q, index) => {
      const choice = answers[index]
      if (choice === 'yes') traits[q.id[0]]++
      else if (choice === 'no') traits[q.id[1]]++
      // neutral does not count toward either
    })

    const result =
      (traits.E >= traits.I ? 'E' : 'I') +
      (traits.S >= traits.N ? 'S' : 'N') +
      (traits.T >= traits.F ? 'T' : 'F') +
      (traits.J >= traits.P ? 'J' : 'P')

     

    setMbti(result)

    const oldData = JSON.parse(localStorage.getItem('studentsList') || '[]')
    

    
    if (oldData) {
        const studentList = oldData
    
        
        if (Array.isArray(studentList) && studentList.length > 0) {
       
          studentList[studentList.length - 1].mbti = result;
    
          // Save it back to localStorage
          localStorage.setItem("studentsList", JSON.stringify(studentList));
        } else {
          console.error("No students found in the list");
        }
      } else {
        console.error("No student list found in localStorage");
      }
    


  }

  const resetForm = () => {
    localStorage.removeItem('mbtiAnswers')
    setAnswers({})
    setMbti(null)
    setCurrentIndex(0)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4 text-center"> MBTI Test</h2>

      {!mbti && currentIndex < questions.length && (
        <div className="text-center">
          <p className="text-lg font-medium mb-6">
            Q{currentIndex + 1}: {questions[currentIndex].text}
          </p>

          <div className="flex justify-center gap-4">
            {['yes', 'neutral', 'no'].map((choice) => (
              <button
                key={choice}
                onClick={() => handleAnswer(choice)}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
              >
                {choice.charAt(0).toUpperCase() + choice.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {mbti && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold text-green-700">Your MBTI Type is:</h3>
          <p className="text-4xl font-bold text-green-800 mt-2">{mbti}</p>
        </div>
      )}

      <button
        onClick={resetForm}
        className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
      >
        Reset Test
      </button>
    </div>
  )
}

export default MBTIQuestionnaire
