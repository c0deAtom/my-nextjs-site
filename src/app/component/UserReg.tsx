'use client'

import { useState, useEffect, ChangeEvent } from "react"

interface Student {
  name: string
  about: string
  age: number
  mbti: string
}

const UserReg = () => {
  const [formData, setFormData] = useState<Student>({
    name: '',
    about: '',
    age: 0,
    mbti: ''
  })

  const [students, setStudents] = useState<Student[]>([])
  const [mssg, setMssg] = useState<string>("")
  const [showList, setShowList] = useState<boolean>(false)

  useEffect(() => {
    const stored = localStorage.getItem('studentsList')
    if (stored) {
      setStudents(JSON.parse(stored))
    }
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? Number(value) : value
    }))
  }

  const handleBtn = (btn: string) => {
    if (btn === "Registor") {
      const oldData = JSON.parse(localStorage.getItem('studentsList') || '[]')
      const updatedList = [...oldData, formData]

      localStorage.setItem("studentsList", JSON.stringify(updatedList))
      setStudents(updatedList)

      setFormData({ name: '', about: '', age: 0, mbti: '' })
      setMssg("User Registered Successfully")
      setShowList(false)
    } else if (btn === "List") {
      const stored = localStorage.getItem('studentsList')
      if (stored) {
        setStudents(JSON.parse(stored))
        setShowList(true)
        setMssg("")
      }
    }
  }

  return (
    <div className="h-full flex justify-center items-center bg-gray-100 py-10">
      <div className="w-[400px] bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-blue-500 text-center mb-4">Student Registration</h1>

        {/* Name */}
        <div className="mb-3">
          <label className="block text-gray-700 font-semibold">Name</label>
          <input
            name="name"
            type="text"
            className="w-full p-2 border rounded-lg text-red-500"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

       
    

        {/* Age */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Age</label>
          <input
            name="age"
            type="number"
            className="w-full p-2 border rounded-lg text-red-500"
            placeholder="Enter age"
            value={formData.age || ""}
            onChange={handleChange}
          />
        </div>


        <div className="mb-3">
          <label className="block text-gray-700 font-semibold">About</label>
          <textarea
            name="about"
            type="about"
            className="w-full p-2 border rounded-lg text-red-500"
            placeholder="Only Truths"
            value={formData.about}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-4 justify-center mb-4">
          {["Registor", "List"].map((btn) => (
            <button
              key={btn}
              className="bg-gray-300 text-black text-md px-4 py-2 rounded-lg hover:bg-gray-400"
              onClick={() => handleBtn(btn)}
            >
              {btn}
            </button>
          ))}
        </div>

        {mssg && <p className="text-green-600 text-center">{mssg}</p>}

    
        {showList && (
          <div className="mt-6">
            <h2 className="text-xl text-blue-600 mb-3 text-center">Registered Students</h2>
            <ul className="space-y-2 text-left">
              {students.map((student, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-3 rounded-lg shadow-sm text-sm"
                >
                  <span className="text-red-500 font-semibold">Name:</span> {student.name} <br />
                  <span className="text-red-500 font-semibold">About:</span> {student.about} <br />
                  <span className="text-red-500 font-semibold">Age:</span> {student.age} <br/>
                  <span className="text-red-500 font-semibold">Mbti:</span> {student.mbti}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserReg
