"use client";

import { useState, useEffect } from "react";

export default function UserIntro() {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedAbout = localStorage.getItem("userAbout");
    if (storedName && storedAbout) {
      setName(storedName);
      setAbout(storedAbout);
      setSubmitted(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && about.trim()) {
      localStorage.setItem("userName", name);
      localStorage.setItem("userAbout", about);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white shadow-md rounded-xl p-6 max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-sky-700 mb-2">Welcome, {name}!</h2>
        <p className="text-sky-600">{about}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 max-w-lg w-full">
      <h2 className="text-2xl font-semibold text-sky-800 mb-4">Tell us about yourself</h2>

      <label className="block text-sky-700 mb-2">Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-sky-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-sky-400"
        placeholder="Enter your name"
        required
      />

      <label className="block text-sky-700 mb-2">About You</label>
      <textarea
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        className="w-full border border-sky-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-sky-400"
        placeholder="Write a little about yourself"
        rows={4}
        required
      ></textarea>

      <button
        type="submit"
        className="bg-sky-600 text-white px-6 py-2 rounded-md hover:bg-sky-700 transition"
      >
        Submit
      </button>
    </form>
  );
}
