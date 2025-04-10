


'use client'



import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"


interface Student {
    name: string
    email: string
    age: number

}


const UserReg1 = () => {


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',

    });

    const [students, setStudents] = useState<Student[]>([])
    const [mssg, setmssg] = useState<string>()
    const [show, setShow] = useState<boolean>(false)

    useEffect(() => {
        const stored = localStorage.getItem('studentList')
        if (stored) {
            setStudents(JSON.parse(stored))
            console.log(JSON.parse(stored))
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))


    }

    const handleClick = (btn: string) => {
        if (btn === 'Register') {
            const oldData = JSON.parse(localStorage.getItem('studentList') || [])
            console.log(oldData)

        }

    }

    return (
        <>


            <div className="h-full flex justify-center items-center bg-gray-100">
                <div className="my-30 w-[400px] bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-blue-500 text-center mb-4">Student Registration</h1>

                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Name</label>
                        <input name="name" type="text" className="w-full p-2 border rounded-lg text-red-500 " placeholder="Enter full name" onChange={handleChange} />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Email</label>
                        <input name="email" type="email" className="w-full p-2 border rounded-lg text-red-500 " placeholder="Enter email" onChange={handleChange} />
                    </div>


                    {/* Age */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Age</label>
                        <input name="age" type="number" className="w-full p-2 border rounded-lg text-red-500 " placeholder="Enter age" onChange={handleChange} />
                    </div>


                    {/* Submit Button */}
                    {['Registor', 'List'].map((btn) => (<button key={btn} className="bg-gray-300 text-black text-xl p-4 rounded-lg hover:bg-gray-400 m-5" onClick={() => handleClick(btn)} >{btn}</button>))}
                    <p className="text-red-500" >{mssg}</p>
                </div>
                <p>{show}</p>

            </div>

        </>
    );

}


export default UserReg1