
"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

type Skill = {
  name: string;
  type: string;
  confidence: number;
  evidence: string;
  reason: string;
  starBullet: string;
};

export default function SkillPassport({
  skills,
  summary,
}: {
  skills: Skill[];
  summary: string;
}) {
  const [studentName, setStudentName] = useState("");

  return (
    <section className="mt-10 rounded-3xl border border-cyan-400/30 bg-[#11172A] p-6 md:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-cyan-400">
            Digital identity
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">
            Your Skill Passport
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            A snapshot of your abilities and the experiences behind them.
          </p>
        </div>

        <span className="rounded-full border border-cyan-400/30 px-4 py-2 text-xs text-cyan-300">
          SKILLDNA PROFILE
        </span>
      </div>

      <div
        id="skill-passport"
        className="rounded-2xl border border-cyan-400/20 bg-[#0B1120] p-6"
      >
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-cyan-400">
              SkillDNA Passport
            </p>

            <h3 className="mt-2 text-2xl font-bold text-white">
              {studentName.trim() || "Your Name"}
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              Skills discovered through real-life experiences
            </p>
          </div>

          <div className="rounded-xl bg-cyan-400/10 p-3 text-center">
            <p className="text-2xl font-bold text-cyan-300">
              {skills.length}
            </p>
            <p className="text-xs text-gray-400">Skills identified</p>
          </div>
        </div>

        <div className="py-5">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-500">
            Experience summary
          </p>

          <p className="text-sm leading-7 text-gray-300">
            {summary}
          </p>
        </div>

        <div className="border-t border-white/10 pt-5">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">
            Skills and supporting evidence
          </p>

          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div
                key={`${skill.name}-${index}`}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-semibold text-cyan-300">
                    {skill.name}
                  </h4>

                  <span className="text-xs text-purple-300">
                    {skill.type} · {skill.confidence}% AI confidence
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  {skill.evidence}
                </p>

                <p className="mt-3 text-sm leading-6 text-gray-300">
                  <span className="font-semibold text-cyan-400">
                    Resume:
                  </span>{" "}
                  {skill.starBullet}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-4 text-center">
          <p className="text-xs text-gray-500">
            Generated with SkillDNA. AI-inferred skills require independent
            verification before being treated as verified credentials.
          </p>

          <div className="mt-6 flex flex-col items-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-400">
              Scan to explore SkillDNA
            </p>

            <div className="rounded-xl bg-white p-3">
              <QRCodeSVG
                value={
                  typeof window !== "undefined"
                    ? window.location.href
                    : "https://skilldna.vercel.app"
                }
                size={130}
              />
            </div>

            <p className="mt-2 text-xs text-gray-500">
              SkillDNA digital profile
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Student name for your passport
          </label>

          <input
            value={studentName}
            onChange={(event) => setStudentName(event.target.value)}
            placeholder="Enter your name"
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-cyan-400"
          />
        </div>

        <button
          onClick={() => window.print()}
          className="w-full rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Print / Save Passport as PDF
        </button>
      </div>
    </section>
  );
}
