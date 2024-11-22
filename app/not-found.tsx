import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black text-white scanline">
      <h1 className="glitch text-6xl mb-8">
        404_ERROR
        <span>404_ERROR</span>
        <span>404_ERROR</span>
      </h1>
      
      <div className="glitch text-xl mb-8">
        PAGE_NOT_FOUND
        <span>PAGE_NOT_FOUND</span>
        <span>PAGE_NOT_FOUND</span>
      </div>

      <p className="text-gray-400 mb-8 text-center">
        The page you&apos;re looking for has been terminated or never existed
      </p>

      <Link 
        href="/" 
        className="px-8 py-3 bg-transparent border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-black transition-all duration-300"
      >
        RETURN_TO_HOME
      </Link>
    </div>
  )
} 