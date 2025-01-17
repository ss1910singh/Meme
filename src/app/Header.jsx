'use client';
// "use server";
import { redirect } from 'next/dist/server/api-utils';
import { useState } from 'react';

const Header = () => {
  const [session, setSession] = useState(null); // Replace with actual authentication logic
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Perform the search logic by redirecting to the search page
    window.location.href = `/search?q=${searchQuery}`;
  };

  return (
    <header className="sticky top-0 flex items-center justify-between h-16 p-4 bg-gray-800 text-white">
      {/* Navbar */}
      <div className="flex items-center gap-4">
        <div className="text-xl font-bold">Acme Inc</div>
      </div>

      {/* Navbar Links */}
      <nav className="hidden md:flex gap-6">
        <a href="/" className="hover:text-gray-400">Home</a>
        <a href="/search" className="hover:text-gray-400">Browse</a>
        {session && (
          <a href="/favorites" className="hover:text-gray-400">Favorites</a>
        )}
      </nav>

      {/* Search Bar */}
      <form 
      action={async (formData) => {
        const { search } = formData.get("search");
        redirect(`/search?q=${search}`);
      }
      }
      onSubmit={handleSearchSubmit} className="flex gap-2">
        <input
          type="text"
          name="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 rounded-md text-black"
          placeholder="Search"
        />
        <button type="submit" className="p-2 bg-blue-600 text-white rounded-md">Search</button>
      </form>

      {/* Account Menu */}
      <div className="flex items-center gap-4">
        {session ? (
          <button
            onClick={() => { /* Add sign out logic here */ }}
            className="text-white hover:text-gray-400"
          >
            Sign out
          </button>
        ) : (
          <button
            onClick={() => { /* Add sign in logic here */ }}
            className="text-white hover:text-gray-400"
          >
            Sign in
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
