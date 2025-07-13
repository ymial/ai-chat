"use client"

import { useState } from 'react';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: 'You are a kind assistant.' },
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newMessage: Message = { role: 'user', content: input };
    const newMessages: Message[] = [...messages, newMessage];

    setMessages(newMessages);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();

    setMessages([...newMessages, data.reply as Message]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl shadow-lg rounded-xl p-6 border border-[#ffffff30]">
        <h1 className="text-2xl font-bold mb-4 text-center">Ai Chat</h1>
        <div className="h-96 overflow-y-auto space-y-4 border border-[#ffffff30] rounded-lg p-4 mb-4">
          {messages
            .filter((m) => m.role !== 'system')
            .map((m, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl max-w-[80%] border ${m.role === 'user' ? 'self-end ml-auto' : 'self-start mr-auto'
                  }`}
              >
                <p className="text-sm whitespace-pre-wrap">{m.content}</p>
              </div>
            ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-[#ffffff30] focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Message..."
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg border border-[#ffffff30] hover:bg-gray-100 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}