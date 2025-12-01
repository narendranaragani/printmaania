"use client";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { user, loading, login } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-black/40">
      <div className="relative p-0 md:p-2 w-full max-w-md mx-auto animate-fadeInPopup">
        <div className="rounded-2xl shadow-2xl border-2 border-[#edf0ee] bg-white overflow-hidden flex flex-col items-center px-8 py-10 text-center backdrop-blur-md">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[#222]">Sign in to continue</h2>
          <p className="text-[#444] text-base mb-7">Login with your Google account</p>
          <button
            onClick={login}
            disabled={loading}
            className={`flex items-center justify-center gap-3 w-full py-3 mb-4 rounded-full font-semibold bg-[#4285F4] hover:bg-[#3367d6] text-white text-lg shadow-md transition-transform active:scale-95 ${loading ? "opacity-70 pointer-events-none" : "hover:shadow-xl"}`}
          >
            <span className="inline-flex"><svg width="28" height="28" viewBox="0 0 48 48"><g><circle fill="#fff" cx="24" cy="24" r="24"/><path fill="#4285F4" d="M34.68 24.43c0-.76-.07-1.53-.2-2.25H24v4.26h6.05c-.25 1.36-1.06 2.5-2.26 3.28v2.72h3.65c2.13-1.96 3.24-4.85 3.24-8.01z"/><path fill="#34A853" d="M24 36c3.06 0 5.63-1.01 7.5-2.74l-3.65-2.72c-1.01.68-2.3 1.1-3.85 1.1-2.95 0-5.45-2-6.35-4.68H14.9v2.85C16.76 33.98 20.13 36 24 36z"/><path fill="#FBBC05" d="M17.65 26.96a7.44 7.44 0 0 1 0-4.68V19.43h-3.15a12.056 12.056 0 0 0 0 9.14l3.15-2.61z"/><path fill="#EA4335" d="M24 18.9c1.67 0 3.16.57 4.35 1.69l3.26-3.23C29.63 15.88 27.06 15 24 15c-3.86 0-7.23 2.02-9.1 4.95l3.15 2.61c.9-2.68 3.4-4.68 6.35-4.68z"/></g></svg></span>
            {loading ? (<span className="ml-2 flex items-center"><svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg> Logging in...</span>) : (<span>Continue with Google</span>)}
          </button>
          <div className="mt-4 text-gray-500 text-xs">No email/password required • Secure by Google</div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadeInPopup {
          from {opacity: 0; transform: scale(0.9) translateY(30px);}
          to {opacity: 1; transform: scale(1) translateY(0);}
        }
        .animate-fadeInPopup {
          animation: fadeInPopup .5s cubic-bezier(.18,.78,.37,1.15);
        }
      `}</style>
    </div>
  );
}
