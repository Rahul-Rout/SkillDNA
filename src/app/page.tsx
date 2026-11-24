
"use client";

import { useState } from "react";
import SkillDNAVisuals from "@/components/SkillDNAVisuals";
import PeerVouch from "@/components/PeerVouch";
import SkillPassport from "@/components/SkillPassport";

interface Skill {
  name: string;
  type: string;
  confidence: number;
  evidence: string;
  reason: string;
  starBullet: string;
}

interface AnalysisResult {
  summary: string;
  skills: Skill[];
  encouragement: string;
}

const demoResult: AnalysisResult = {
  summary:
    "Your experience organising a college event demonstrates several valuable skills in coordination, leadership and problem-solving.",
  skills: [
    {
      name: "Leadership",
      type: "Behavioral",
      confidence: 91,
      evidence: "You divided responsibilities among a team of 8 students.",
      reason:
        "Taking responsibility for coordinating team members suggests leadership ability.",
      starBullet:
        "Coordinated an 8-member student team by assigning responsibilities and supporting event execution.",
    },
    {
      name: "Team Coordination",
      type: "Behavioral",
      confidence: 94,
      evidence:
        "You coordinated with different departments and managed the team.",
      reason:
        "Working across teams and departments demonstrates coordination skills.",
      starBullet:
        "Collaborated with multiple departments to coordinate college event activities.",
    },
    {
      name: "Time Management",
      type: "Behavioral",
      confidence: 87,
      evidence: "You managed the event schedule.",
      reason:
        "Managing schedules and activities suggests an ability to organise time and priorities.",
      starBullet:
        "Managed event schedules and coordinated activities to support smooth execution.",
    },
    {
      name: "Problem Solving",
      type: "Behavioral",
      confidence: 89,
      evidence: "You helped solve unexpected problems during the event.",
      reason:
        "Responding to unexpected challenges demonstrates practical problem-solving.",
      starBullet:
        "Addressed unexpected event challenges through practical decision-making and coordination.",
    },
  ],
  encouragement:
    "Your everyday experiences can reveal valuable abilities. Keep collecting evidence of what you can do!",
};

export default function Home() {
  const [story, setStory] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [demoMode, setDemoMode] = useState(false);

  async function analyzeStory() {
    setError("");
    setResult(null);
    setDemoMode(false);

    if (story.trim().length < 20) {
      setError(
        "Please enter at least 20 characters about your experience."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ story }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setResult(data as AnalysisResult);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to analyse your story. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function loadDemo() {
    setError("");
    setStory("");
    setResult(demoResult);
    setDemoMode(true);
  }

  return (
    <main className="min-h-screen bg-[#080B18] text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between border-b border-white/10 px-8 py-6">
        <h1 className="text-2xl font-bold">
          Skill<span className="text-cyan-400">DNA</span>
        </h1>

        <a
          href="#discover"
          className="rounded-full bg-cyan-400 px-5 py-2 font-semibold text-black hover:bg-cyan-300"
        >
          Discover your skills
        </a>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <div className="mb-8 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm text-cyan-300">
          AI-powered hidden skill discovery
        </div>

        <h2 className="text-5xl font-extrabold leading-tight md:text-7xl">
          You have more skills
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            than you think.
          </span>
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-400">
          Your experiences tell a story your resume cannot.
          SkillDNA uses AI to uncover your hidden strengths,
          turn real-life experiences into proof, and reveal
          the professional you can become.
        </p>

        <a
          href="#discover"
          className="mt-10 inline-block rounded-full bg-cyan-400 px-8 py-4 font-bold text-black hover:bg-cyan-300"
        >
          Discover my Skill DNA →
        </a>

        {/* Three Feature Cards */}
        <div className="mx-auto mt-20 grid max-w-4xl gap-5 text-left md:grid-cols-3">
          {[
            {
              number: "01",
              title: "Discover",
              description:
                "Tell your story. Let AI uncover the skills hidden in your experiences.",
            },
            {
              number: "02",
              title: "Verify",
              description:
                "Build credibility through peer vouches and practical challenges.",
            },
            {
              number: "03",
              title: "Prove",
              description:
                "Turn your abilities into evidence-backed career opportunities.",
            },
          ].map((item) => (
            <div
              key={item.number}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-7"
            >
              <span className="text-sm font-bold text-cyan-400">
                {item.number}
              </span>

              <h3 className="mt-4 text-xl font-bold">
                {item.title}
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Skill Discovery Section */}
      <section
        id="discover"
        className="mx-auto max-w-3xl px-6 pb-16"
      >
        <div className="rounded-3xl border border-cyan-400/20 bg-[#11172A] p-8 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Your journey starts here
          </p>

          <h2 className="mt-4 text-3xl font-bold">
            Tell us something you've done.
          </h2>

          <p className="mt-4 leading-7 text-gray-400">
            Describe an experience from college, school, work, or everyday
            life where you took responsibility or solved a problem.
          </p>

          <textarea
            value={story}
            onChange={(event) => setStory(event.target.value)}
            placeholder="For example: I organised a college event, managed a team, solved a difficult problem..."
            className="mt-7 min-h-40 w-full resize-y rounded-xl border border-white/10 bg-[#080B18] p-5 text-white outline-none placeholder:text-gray-600 focus:border-cyan-400"
          />

          <button
            onClick={analyzeStory}
            disabled={loading}
            className="mt-5 w-full rounded-xl bg-cyan-400 px-6 py-4 font-bold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Discovering your skills..."
              : "Start discovering my skills →"}
          </button>

          <button
            onClick={loadDemo}
            disabled={loading}
            className="mt-3 w-full rounded-xl border border-purple-400/40 bg-purple-400/10 px-6 py-4 font-bold text-purple-300 transition hover:bg-purple-400/20 disabled:opacity-50"
          >
            Explore SkillDNA Demo →
          </button>

          {error && (
            <p className="mt-5 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-red-300">
              {error}
            </p>
          )}
        </div>
      </section>

      {/* Results Section */}
      {result && (
        <section className="mx-auto max-w-5xl px-6 pb-24">
          {demoMode && (
            <div className="mb-5 rounded-xl border border-purple-400/30 bg-purple-400/10 p-4 text-center text-sm text-purple-300">
              DEMO MODE — These are illustrative sample results, not a real AI assessment.
            </div>
          )}

          <div className="rounded-3xl border border-cyan-400/30 bg-[#11172A] p-8 md:p-10">
            <p className="text-sm font-bold uppercase tracking-widest text-cyan-400">
              Your SkillDNA results
            </p>

            <h2 className="mt-4 text-3xl font-bold">
              Skills discovered
            </h2>

            <p className="mt-4 leading-7 text-gray-300">
              {result.summary}
            </p>

            {/* Skill Visualization */}
            <SkillDNAVisuals
              skills={result.skills}
              summary={result.summary}
            />

            {/* Individual Skill Cards */}
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {result.skills.map((skill, index) => (
                <div
                  key={`${skill.name}-${index}`}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-bold text-cyan-300">
                      {skill.name}
                    </h3>

                    <span className="rounded-full bg-purple-400/10 px-3 py-1 text-xs text-purple-300">
                      {skill.type}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-gray-400">
                    {skill.reason}
                  </p>

                  <div className="mt-5">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">
                        AI confidence
                      </span>

                      <span className="font-bold text-cyan-300">
                        {skill.confidence}%
                      </span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-cyan-400"
                        style={{
                          width: `${Math.max(
                            0,
                            Math.min(100, skill.confidence)
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-5 border-t border-white/10 pt-4">
                    <p className="text-xs font-bold uppercase text-gray-500">
                      Evidence from your story
                    </p>

                    <p className="mt-2 text-sm leading-6 text-gray-300">
                      {skill.evidence}
                    </p>
                  </div>

                  <div className="mt-5 rounded-xl bg-cyan-400/5 p-4">
                    <p className="text-xs font-bold uppercase text-cyan-400">
                      Resume bullet suggestion
                    </p>

                    <p className="mt-2 text-sm leading-6 text-gray-300">
                      {skill.starBullet}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Encouragement */}
            <p className="mt-8 rounded-xl bg-cyan-400/10 p-5 text-center text-cyan-200">
              {result.encouragement}
            </p>

            {/* Peer Vouch */}
            <PeerVouch />

            {/* Skill Passport */}
            <SkillPassport
              skills={result.skills}
              summary={result.summary}
            />

            <p className="mt-4 text-center text-xs text-gray-500">
              AI-generated suggestions based on the story provided.
              Review them for accuracy before using them.
            </p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-gray-500">
        <p>
          © 2026 SkillDNA · Discover what makes you capable.
        </p>

        <p className="mt-2">
          Built by Team Red Dragon · wHACKiest 2026
        </p>
      </footer>
    </main>
  );
}
