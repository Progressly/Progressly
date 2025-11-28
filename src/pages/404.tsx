export default function NotFoundPage() {
    return (
        <div className="min-h-screen font-sans flex items-center justify-center bg-gradient-to-br from-[#072453] to-[#0F518C]">
            <div className="text-center p-8">
                <h1 className="text-9xl font-bold text-white mb-4 hover:scale-105 transition-transform duration-300">
                    404
                </h1>
                <h2 className="text-4xl font-semibold mb-6">
                    <span className="text-[#208EF3]">Page</span>{" "}
                    <span className="text-[#0F518C]">Not</span>{" "}
                    <span className="text-[#0F518C]">Found</span>
                </h2>
                <p className="text-gray-300 mb-8 text-lg">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <a
                    href="/"
                    className="inline-block px-8 py-3 rounded-lg bg-[#208EF3] text-white text-lg font-medium hover:bg-[#0F518C] transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                    Return Home
                </a>
            </div>
        </div>
    );
}
