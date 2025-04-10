'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect } from 'react';

const data = [
  { day: 'Mon', steps: 3000, calories: 220 },
  { day: 'Tue', steps: 5000, calories: 340 },
  { day: 'Wed', steps: 7000, calories: 400 },
  { day: 'Thu', steps: 6000, calories: 360 },
  { day: 'Fri', steps: 9000, calories: 500 },
  { day: 'Sat', steps: 12000, calories: 600 },
  { day: 'Sun', steps: 8000, calories: 450 },
];

export default function HealthStatsPage() {
  const [stats, setStats] = useState(data);

  useEffect(() => {
    // In real-world scenario, fetch or compute data here
    setStats(data);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 to-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-10">Weekly Health Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-xl rounded-2xl">
            <CardContent>
              <h2 className="text-2xl font-semibold text-green-700 mb-4">Steps Taken</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="steps" stroke="#34D399" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-xl rounded-2xl">
            <CardContent>
              <h2 className="text-2xl font-semibold text-red-600 mb-4">Calories Burned</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="calories" stroke="#F87171" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-600 text-sm">Keep tracking to stay fit and healthy 💪</p>
        </div>
      </div>
    </main>
  );
}
