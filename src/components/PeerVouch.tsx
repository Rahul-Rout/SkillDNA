
"use client";

import { useState } from "react";

type Vouch = {
  name: string;
  relationship: string;
  skill: string;
  message: string;
};

export default function PeerVouch() {
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("Teammate");
  const [skill, setSkill] = useState("");
  const [message, setMessage] = useState("");
  const [vouches, setVouches] = useState<Vouch[]>([]);
  const [success, setSuccess] = useState(false);

  function submitVouch() {
    if (!name.trim() || !skill.trim() || !message.trim()) {
      return;
    }

    const newVouch: Vouch = {
      name,
      relationship,
      skill,
      message,
    };

    setVouches((previous) => [...previous, newVouch]);

    setName("");
    setSkill("");
    setMessage("");
    setSuccess(true);
  }

  return (
    <section className="mt-10 rounded-3xl border border-purple-400/20 bg-[#11172A] p-6 md:p-8">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-widest text-purple-400">
          Peer verification
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Your skills, recognised by others
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-400">
          Let teammates and friends share examples of skills they have
          personally observed in you.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Reviewer name
          </label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter reviewer name"
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-purple-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Your relationship
          </label>
          <select
            value={relationship}
            onChange={(event) => setRelationship(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#1b2438] p-3 text-white outline-none focus:border-purple-400"
          >
            <option>Teammate</option>
            <option>Classmate</option>
            <option>Friend</option>
            <option>Project partner</option>
            <option>Club member</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Skill being recognised
          </label>
          <input
            value={skill}
            onChange={(event) => setSkill(event.target.value)}
            placeholder="Example: Leadership"
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-purple-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Example of when you demonstrated this skill
          </label>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Describe something you personally observed..."
            rows={3}
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-purple-400"
          />
        </div>

        <button
          onClick={submitVouch}
          className="w-full rounded-xl bg-purple-500 px-5 py-3 font-semibold text-white transition hover:bg-purple-400"
        >
          Submit Peer Vouch
        </button>

        {success && (
          <p className="text-center text-sm text-green-400">
            Peer feedback added successfully!
          </p>
        )}
      </div>

      <div className="mt-8 border-t border-white/10 pt-6">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Peer Vouches ({vouches.length})
        </h3>

        {vouches.length === 0 ? (
          <p className="text-sm text-gray-500">
            No peer feedback received yet.
          </p>
        ) : (
          <div className="space-y-4">
            {vouches.map((vouch, index) => (
              <div
                key={index}
                className="rounded-xl border border-purple-400/20 bg-purple-400/5 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-white">
                    {vouch.name}
                  </p>
                  <span className="text-xs text-purple-300">
                    {vouch.relationship}
                  </span>
                </div>

                <p className="mt-2 text-sm font-medium text-purple-300">
                  Recognised skill: {vouch.skill}
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-300">
                  {vouch.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
