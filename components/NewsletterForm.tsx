"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <form className="newsletter" onSubmit={handleSubmit}>
      <h3>Stay in the loop</h3>
      <p>Get weekly mushroom coffee brew tips, product reviews, and research recaps.</p>
      <div className="newsletter__controls">
        <input
          type="email"
          name="email"
          aria-label="Email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Joining..." : "Join the newsletter"}
        </button>
      </div>
      {status === "success" ? (
        <p role="status" className="newsletter__status">
          Thanks! Please check your inbox to confirm.
        </p>
      ) : null}
      {status === "error" ? (
        <p role="alert" className="newsletter__status error">
          Something went wrong. Please try again.
        </p>
      ) : null}
    </form>
  );
}
