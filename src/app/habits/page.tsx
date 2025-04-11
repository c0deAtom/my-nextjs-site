"use client";

import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";

type Card = {
  id: number;
  title: string;
  details: string;
  greenCount: number;
  redCount: number;
};

export default function CardManager() {
  const [cards, setCards] = useState<Card[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("habitCards");
    if (stored) setCards(JSON.parse(stored));
  }, []);

  const saveCards = (newCards: Card[]) => {
    setCards(newCards);
    localStorage.setItem("habitCards", JSON.stringify(newCards));
  };

  const addCard = () => {
    if (!title.trim() && !details.trim()) return;

    const newCard: Card = {
      id: Date.now(),
      title,
      details,
      greenCount: 0,
      redCount: 0,
    };

    const updated = [...cards, newCard];
    saveCards(updated);
    setTitle("");
    setDetails("");
    setShowForm(false);
  };

  const deleteCard = (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this habit?");
    if (!confirmDelete) return;
  
    const updated = cards.filter((card) => card.id !== id);
    saveCards(updated);
  };
  

  const incrementCount = (id: number, type: "green" | "red") => {
    const updated = cards.map((card) =>
      card.id === id
        ? {
            ...card,
            greenCount: type === "green" ? card.greenCount + 1 : card.greenCount,
            redCount: type === "red" ? card.redCount + 1 : card.redCount,
          }
        : card
    );
    saveCards(updated);
  };

  return (
    <>
     <Navbar />
  
    <div className="w-screen h-screen flex flex-col bg-gray-800 p-4 ">
     
      {/* Add Button & Form */}
      <div className="mb-4 flex">
        <button
          className="text-xl bg-green-200 text-black px-4 py-2 rounded hover:bg-green-300"
          onClick={() => setShowForm(!showForm)}
        >
          ➕ Add Habit
        </button>

        {showForm && (
          <div className="mx-10 text-xl bg-green-200 h-11 text-white px-1 py-1 rounded hover:bg-green-300 flex gap-5 items-center">
            <input
              type="text"
              placeholder="Habit Title"
              className="block w-full  h-8 my- px-4 py-2 border rounded text-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              placeholder="Details"
              className="block w-full  h-8 px-4 py-2 border rounded text-black"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white h-9 px-4 py-1 rounded hover:bg-blue-700"
              onClick={addCard}
            >
              Save
            </button>
          </div>
        )}
      </div>

      {/* Cards Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-green-200 p-4 rounded shadow relative flex flex-col justify-between h-52"
            >
              <button
                onClick={() => deleteCard(card.id)}
                className="absolute top-2 right-2 text-red-500 font-bold"
              >
                ❌
              </button>
              <div className="flex items-center justify-center flex-col">
                <h3 className="text-lg font-bold text-black">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.details}</p>
              </div>
              <div className="flex justify-between items-center mt-4 mx-10 ">
              <span className="text-black text-6xl">{card.greenCount}</span>
              <span className="text-black text-6xl">{card.redCount}</span>

                </div>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-2">
                  
                  <button
                    onClick={() => incrementCount(card.id, "green")}
                    className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-600 w-30 h-13"
                  >
                    ✅
                  </button>
                 
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => incrementCount(card.id, "red")}
                    className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-600 w-30 h-13"
                  >
                    ❌
                  </button>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
      </>
  );
}
