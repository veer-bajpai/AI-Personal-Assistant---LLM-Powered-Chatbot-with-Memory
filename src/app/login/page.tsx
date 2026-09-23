"use client";

import Link from "next/link";
import { ArrowRight, Github, LockKeyhole, Sparkles } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="login-shell">
      <section className="login-visual">
        <div className="brand-row">
          <div className="brand-mark">
            <Sparkles size={17} />
          </div>
          <span>friday</span>
        </div>
        <div className="login-quote">
          <span className="eyebrow">LOCAL-FIRST INTELLIGENCE</span>
          <h1>
            Your documents.
            <br />
            <em>Your context.</em>
            <br />
            Your assistant.
          </h1>
          <p>A calm, private workspace for thinking with your own knowledge.</p>
        </div>
        <div className="login-orbit">
          <div className="orbit-ring ring-one" />
          <div className="orbit-ring ring-two" />
          <div className="orbit-core">
            <Sparkles size={28} />
          </div>
          <span className="orbit-label label-one">semantic search</span>
          <span className="orbit-label label-two">private by default</span>
        </div>
        <div className="login-footer">
          Friday v0.1 · Built for thoughtful work
        </div>
      </section>
      <section className="login-form-panel">
        <div className="login-form">
          <span className="eyebrow">WELCOME BACK</span>
          <h2>Sign in to Friday</h2>
          <p className="form-lede">Continue to your personal AI workspace.</p>
          <button className="oauth-button">
            <Github size={17} /> Continue with GitHub
          </button>
          <div className="divider">
            <span>or continue with email</span>
          </div>
          <label>
            Email address
            <input type="email" placeholder="you@example.com" />
          </label>
          <label>
            Password
            <div className="password-field">
              <input type="password" placeholder="Enter your password" />
              <LockKeyhole size={15} />
            </div>
          </label>
          <button className="login-button">
            Sign in <ArrowRight size={16} />
          </button>
          <p className="signup-copy">
            New to Friday? <Link href="/">Create an account</Link>
          </p>
          <p className="privacy-note">
            By continuing, you agree to the Friday terms and privacy policy.
          </p>
        </div>
      </section>
    </main>
  );
}
