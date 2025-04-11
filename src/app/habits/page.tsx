"use client";

import { useEffect, useState } from "react";


type Card = {
  id: number;
  title: string;
  details: string;
};

export default function CardManager() {
  const [cards, setCards] = useState<Card[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("cards");
    if (stored) setCards(JSON.parse(stored));
  }, []);

  const saveCards = (newCards: Card[]) => {
    localStorage.setItem("cards", JSON.stringify(newCards));
    setCards(newCards);
  };

  const addCard = () => {
    if (!title || !details) return;
    const newCard: Card = {
      id: Date.now(),
      title,
      details,
    };
    const updated = [...cards, newCard];
    saveCards(updated);
    setTitle("");
    setDetails("");
    setShowForm(false);
  };

  const deleteCard = (id: number) => {
    const updated = cards.filter((card) => card.id !== id);
    saveCards(updated);
  };

  return (
    <>
  
    <div className="max-w-2xl mx-auto p-6 ">
      {/* Add Card Button */}
      <button
        className="text-2xl font-bold bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
        onClick={() => setShowForm(!showForm)}
      >
        ➕ Add Card
      </button>

      {/* Form */}
      {showForm && (
        <div className="mb-6 bg-gray-100 p-4 rounded shadow">
          <input
            type="text"
            placeholder="Title"
            className="block w-full p-2 mb-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Details"
            className="block w-full p-2 mb-2 border rounded"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={addCard}
          >
            Save
          </button>
        </div>
      )}

      {/* Cards Display */}
      <div className="flex space-x-4 overflow-x-auto p-4">
        {cards.map((card) => (
          <div key={card.id} className="border p-4 rounded shadow relative w-40 h-40 ">
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="text-sm text-gray-700">{card.details}</p>
            <button
              onClick={() => deleteCard(card.id)}
              className="absolute top-2 right-2 text-red-500 font-bold"
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
