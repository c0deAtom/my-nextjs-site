"use client";

import { useEffect, useState } from "react";

type Habit = {
  id: string;
  title: string;
  description: string;
};

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("userHabits");
    if (stored) {
      setHabits(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage whenever habits change
  useEffect(() => {
    localStorage.setItem("userHabits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (!title.trim()) return;

    const newHabit: Habit = {
      id: crypto.randomUUID(),
      title,
      description,
    };

    setHabits([newHabit, ...habits]);
    setTitle("");
    setDescription("");
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter((h) => h.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">My Habits Tracker</h1>

      <div className="max-w-xl mx-auto mb-8 bg-white p-6 rounded-xl shadow">
        <input
          type="text"
          placeholder="Habit title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />
        <button
          onClick={addHabit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Add Habit
        </button>
      </div>

      <div className="max-w-xl mx-auto grid gap-4">
        {habits.map((habit) => (
          <div key={habit.id} className="bg-white p-4 rounded-lg shadow border relative">
            <h2 className="text-lg font-semibold text-gray-800">{habit.title}</h2>
            {habit.description && <p className="text-gray-600">{habit.description}</p>}
            <button
              onClick={() => deleteHabit(habit.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              title="Delete"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
