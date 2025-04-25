"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <h2 className="text-3xl font-bold mb-4">404 - Page not found</h2>
      <p className="text-gray-600 mb-6">The page you are looking for does not exist or has been moved.</p>
      <Link
        href="/"
        className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-600/90 transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}
