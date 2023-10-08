
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-6">Welcome to Embedchain</h1>
        <p className="text-gray-400 mb-8">Your platform for diverse data sources.</p>
        <Link href="/home">
          <div className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300">
            Go to Home
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;