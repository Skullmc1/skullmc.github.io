"use client";
import { useState } from "react";
import { supabase } from "../../persona/lib/newSupabase";

export default function AuthButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegistering) {
        if (password !== confirmPassword) {
          throw new Error("Passwords don't match");
        }

        // Register
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: `${username.toLowerCase()}@temporary.com`,
          password,
          options: {
            data: {
              username,
            },
          },
        });

        if (signUpError) throw signUpError;

        // Create profile
        const { error: profileError } = await supabase
          .from("profiles")
          .insert([{ id: data.user.id, username }]);

        if (profileError) throw profileError;

        setError("Account created! You can now sign in.");
        setIsTransitioning(true);
        setTimeout(() => {
          setIsRegistering(false);
          setIsTransitioning(false);
          setPassword("");
          setConfirmPassword("");
        }, 300);
      } else {
        // Sign in
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: `${username.toLowerCase()}@temporary.com`,
          password,
        });

        if (signInError) throw signInError;
        setIsModalOpen(false);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const [user, setUser] = useState(null);

  // Check auth status
  useState(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (user) {
    return (
      <button
        onClick={handleSignOut}
        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-yellow-500 rounded-md hover:from-red-600 hover:to-yellow-600 transition-all"
      >
        Sign Out
      </button>
    );
  }

  if (!isModalOpen) {
    return (
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-yellow-500 rounded-md hover:from-red-600 hover:to-yellow-600 transition-all"
      >
        Sign In
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div
          className={`transform transition-all duration-300 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            {isRegistering ? "Create Account" : "Sign In"}
          </h2>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.trim())}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                required
                minLength={3}
                pattern="[a-zA-Z0-9_-]+"
                title="Username can only contain letters, numbers, underscores, and hyphens"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                required
                minLength={6}
              />
              {isRegistering && (
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 6 characters long
                </p>
              )}
            </div>

            {isRegistering && (
              <div className="transition-opacity duration-200">
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                  required
                  minLength={6}
                />
              </div>
            )}

            {error && (
              <div
                className={`text-sm font-medium ${error.includes("created") ? "text-green-600" : "text-red-600"}`}
              >
                {error}
              </div>
            )}

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-yellow-500 rounded-md hover:from-red-600 hover:to-yellow-600 transition-all disabled:opacity-50"
              >
                {loading
                  ? "Loading..."
                  : isRegistering
                    ? "Register"
                    : "Sign In"}
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </form>

          <button
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setIsRegistering(!isRegistering);
                setError("");
                setIsTransitioning(false);
              }, 300);
            }}
            className="mt-4 text-sm font-medium text-gray-600 hover:text-red-500 transition-colors"
          >
            {isRegistering
              ? "Already have an account? Sign in"
              : "Need an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
}
