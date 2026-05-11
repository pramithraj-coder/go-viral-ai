"use client";

import { useState } from "react";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import CountUp from "react-countup";

export default function UploadBox() {

  const [caption, setCaption] = useState("");

  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [preview, setPreview] = useState("");

  const [result, setResult] = useState<any>(null);

  // Clean AI text
  const cleanText = (text: string) => {
    return text
      ?.replace(/\\'/g, "'")
      ?.replace(/\\"/g, '"')
      ?.replace(/\\n/g, " ")
      ?.replace(/\s+/g, " ")
      ?.trim();
  };

  async function analyzeVirality() {

    if (!caption && !selectedFile) return;

    setLoading(true);

    const formData = new FormData();

    formData.append("caption", caption);

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setResult(data);

    } catch (error) {

      console.error(error);

    }

    setLoading(false);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {

    const file = e.target.files?.[0];

    if (file) {

      setSelectedFile(file);

      setPreview(URL.createObjectURL(file));
    }
  }

  return (

    <div className="mx-auto mt-12 w-full max-w-4xl rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur-xl">

      {/* Upload Area */}
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-700 p-10 text-center transition-all hover:border-pink-500">

        <p className="text-xl font-semibold text-white">
          Upload Reel / Thumbnail
        </p>

        <p className="mt-2 text-sm text-gray-400">
          Supports JPG, PNG
        </p>

        <div className="mt-6 flex justify-center">

          <label className="cursor-pointer rounded-xl bg-zinc-800 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-zinc-700">

            Choose File

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

          </label>

        </div>

        {/* Preview */}
        {preview && (

          <img
            src={preview}
            alt="Preview"
            className="mt-6 h-52 rounded-2xl object-cover"
          />

        )}

      </div>

      {/* Caption */}
      <div className="mt-6">

        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Paste Instagram caption here..."
          className="h-36 w-full resize-none rounded-2xl border border-zinc-700 bg-black px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

      </div>

      {/* Analyze Button */}
      <button
        onClick={analyzeVirality}
        className="mt-6 w-full rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 py-4 text-lg font-semibold transition-all hover:scale-[1.02]"
      >

        {loading ? "Analyzing..." : "Analyze Virality"}

      </button>

      {/* Results */}
      {result && (

        <div className="mt-8 space-y-6">

          {/* Analytics Dashboard */}
          <div className="rounded-3xl border border-zinc-800 bg-black p-8">

            <h2 className="text-center text-2xl font-bold text-white">
              AI Viral Analytics
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">

              {/* Virality */}
              <div className="flex flex-col items-center">

                <div className="relative h-40 w-40">

                  <CircularProgressbar
                    value={result.virality}
                    text=""
                    styles={buildStyles({
                      textColor: "#fff",
                      pathColor: "#ec4899",
                      trailColor: "#27272a",
                    })}
                  />

                  <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">

                    <CountUp
                      end={result.virality}
                      duration={2}
                      suffix="%"
                    />

                  </div>

                </div>

                <p className="mt-4 text-lg font-semibold text-white">
                  Virality
                </p>

              </div>

              {/* Hook */}
              <div className="flex flex-col items-center">

                <div className="h-40 w-40">

                  <CircularProgressbar
                    value={result.hook}
                    text={`${result.hook}%`}
                    styles={buildStyles({
                      textColor: "#fff",
                      pathColor: "#8b5cf6",
                      trailColor: "#27272a",
                    })}
                  />

                </div>

                <p className="mt-4 text-lg font-semibold text-white">
                  Hook Strength
                </p>

              </div>

              {/* Engagement */}
              <div className="flex flex-col items-center">

                <div className="h-40 w-40">

                  <CircularProgressbar
                    value={result.engagement}
                    text={`${result.engagement}%`}
                    styles={buildStyles({
                      textColor: "#fff",
                      pathColor: "#06b6d4",
                      trailColor: "#27272a",
                    })}
                  />

                </div>

                <p className="mt-4 text-lg font-semibold text-white">
                  Engagement
                </p>

              </div>

              {/* Emotion */}
              <div className="flex flex-col items-center">

                <div className="h-40 w-40">

                  <CircularProgressbar
                    value={result.emotion}
                    text={`${result.emotion}%`}
                    styles={buildStyles({
                      textColor: "#fff",
                      pathColor: "#f59e0b",
                      trailColor: "#27272a",
                    })}
                  />

                </div>

                <p className="mt-4 text-lg font-semibold text-white">
                  Emotional Impact
                </p>

              </div>

            </div>

          </div>

          {/* AI Breakdown */}
          <div className="rounded-3xl border border-zinc-800 bg-black p-8">

            <h2 className="mb-8 text-2xl font-bold text-white">
              AI Content Breakdown
            </h2>

            <div className="space-y-6">

              {/* Viral Potential */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                <h3 className="mb-3 text-lg font-semibold text-pink-400">
                  Viral Potential Analysis
                </h3>

                <p className="leading-8 text-gray-300">
                  {
                    cleanText(
                      result.analysis
                        ?.split("Viral Potential Analysis:")[1]
                        ?.split("Hook Strength Analysis:")[0]
                    )
                  }
                </p>
              </div>

              {/* Hook */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                <h3 className="mb-3 text-lg font-semibold text-purple-400">
                  Hook Strength Analysis
                </h3>

                <p className="leading-8 text-gray-300">
                  {
                    cleanText(
                      result.analysis
                        ?.split("Hook Strength Analysis:")[1]
                        ?.split("Emotional Trigger Analysis:")[0]
                    )
                  }
                </p>
              </div>

              {/* Emotional */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                <h3 className="mb-3 text-lg font-semibold text-orange-400">
                  Emotional Trigger Analysis
                </h3>

                <p className="leading-8 text-gray-300">
                  {
                    cleanText(
                      result.analysis
                        ?.split("Emotional Trigger Analysis:")[1]
                        ?.split("Caption Weaknesses:")[0]
                    )
                  }
                </p>
              </div>

              {/* Better Caption */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                <h3 className="mb-3 text-lg font-semibold text-cyan-400">
                  Better Viral Caption
                </h3>

                <p className="leading-8 text-gray-300">
                  {
                    cleanText(
                      result.analysis
                        ?.split("Better Viral Caption:")[1]
                        ?.split("Engagement Tips:")[0]
                    )
                  }
                </p>
              </div>

              {/* Hashtags */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                <h3 className="mb-3 text-lg font-semibold text-green-400">
                  Viral Hashtags
                </h3>

                <p className="leading-8 text-gray-300">
                  {
                    cleanText(
                      result.analysis
                        ?.split("Viral Hashtags:")[1]
                        ?.split("Creator Strategy Tips:")[0]
                    )
                  }
                </p>
              </div>

              {/* Creator Tips */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                <h3 className="mb-3 text-lg font-semibold text-yellow-400">
                  Creator Strategy Tips
                </h3>

                <p className="leading-8 text-gray-300">
                  {
                    cleanText(
                      result.analysis
                        ?.split("Creator Strategy Tips:")[1]
                    )
                  }
                </p>
              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}