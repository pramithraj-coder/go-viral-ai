import UploadBox from "@/components/UploadBox";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          Go Viral AI
        </h1>

        <p className="mt-6 text-gray-400 text-xl">
          Upload your reels, captions or thumbnails and let AI analyze
          their viral potential instantly.
        </p>

        <UploadBox />
      </div>
    </main>
  );
}