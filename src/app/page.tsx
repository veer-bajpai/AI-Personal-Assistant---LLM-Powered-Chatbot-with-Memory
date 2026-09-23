"use client";

import { useState } from "react";
import {
  Activity,
  Archive,
  ArrowUp,
  BarChart3,
  BookOpen,
  ChevronDown,
  FileText,
  FolderOpen,
  Grid2X2,
  ImagePlus,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  Plus,
  Search,
  Settings,
  Sparkles,
  Upload,
  X,
} from "lucide-react";

const documents = [
  {
    name: "Vector databases explained.pdf",
    type: "PDF",
    size: "2.4 MB",
    color: "coral",
  },
  { name: "HNSW research notes.md", type: "MD", size: "18 KB", color: "mint" },
  {
    name: "embedding-benchmark.csv",
    type: "CSV",
    size: "64 KB",
    color: "gold",
  },
];

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

export default function Home() {
  const [view, setView] = useState("Chat");
  const [message, setMessage] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);

  async function handleSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = message.trim();
    if (!question || isSending) return;

    setChatMessages((current) => [
      ...current,
      { role: "user", text: question },
    ]);
    setMessage("");
    setIsSending(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, k: 3 }),
      });
      if (!response.ok) throw new Error("API unavailable");
      const result = await response.json();
      setChatMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: result.answer ?? "I could not generate an answer.",
        },
      ]);
    } catch {
      setChatMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: "Your message was received. Start the Friday API and Ollama to enable local RAG answers.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className="app-shell">
      <aside className={`sidebar ${mobileMenu ? "is-open" : ""}`}>
        <div className="brand-row">
          <div className="brand-mark">
            <Sparkles size={17} />
          </div>
          <span>friday</span>
          <button
            className="icon-button mobile-close"
            onClick={() => setMobileMenu(false)}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>
        <button className="new-chat" onClick={() => setView("Chat")}>
          <Plus size={16} /> New conversation <span>⌘ K</span>
        </button>
        <nav className="main-nav" aria-label="Primary navigation">
          {[
            [MessageSquare, "Chat"],
            [FileText, "Documents"],
            [Activity, "Activity"],
            [Archive, "History"],
          ].map(([Icon, label]) => (
            <button
              className={`nav-item ${view === label ? "selected" : ""}`}
              key={label as string}
              onClick={() => setView(label as string)}
            >
              <Icon size={17} /> {label as string}
            </button>
          ))}
        </nav>
        <div className="sidebar-label">Workspace</div>
        <button className="nav-item">
          <FolderOpen size={17} /> My library{" "}
          <span className="nav-count">12</span>
        </button>
        <button className="nav-item">
          <Grid2X2 size={17} /> Collections
        </button>
        <div className="sidebar-spacer" />
        <div className="local-card">
          <div className="status-dot" />
          <div>
            <strong>Local engine</strong>
            <span>Ollama connected</span>
          </div>
          <MoreHorizontal size={16} />
        </div>
        <button className="nav-item muted">
          <Settings size={17} /> Settings
        </button>
        <div className="profile">
          <div className="avatar">VB</div>
          <div>
            <strong>Veer Bajpai</strong>
            <span>Personal workspace</span>
          </div>
          <ChevronDown size={16} />
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <button
            className="icon-button menu-trigger"
            onClick={() => setMobileMenu(true)}
            aria-label="Open navigation"
          >
            <Menu size={19} />
          </button>
          <div className="breadcrumbs">
            <span>Workspace</span>
            <span>/</span>
            <strong>{view}</strong>
          </div>
          <div className="top-actions">
            <button className="icon-button">
              <Search size={18} />
            </button>
            <button className="icon-button">
              <BarChart3 size={18} />
            </button>
            <div className="mini-avatar">VB</div>
          </div>
        </header>
        <div className="content-grid">
          <section className="chat-column">
            <div className="chat-head">
              <div>
                <div className="eyebrow">
                  PERSONAL ASSISTANT <span className="live-pill">LIVE</span>
                </div>
                <h1>{view === "Chat" ? "How HNSW indexing works" : view}</h1>
              </div>
              <button className="icon-button">
                <MoreHorizontal size={19} />
              </button>
            </div>
            {view === "Chat" ? (
              <>
                <div className="conversation-meta">
                  <span>Today, 10:42 AM</span>
                  <span className="line" />
                  <span>Friday · llama3.2</span>
                </div>
                <div className="messages">
                  <div className="message user-message">
                    <div className="message-avatar user-avatar">VB</div>
                    <div>
                      <div className="message-author">
                        You <span>10:42 AM</span>
                      </div>
                      <p>
                        Can you explain how HNSW indexing works and why it
                        performs better than brute force for semantic search?
                      </p>
                    </div>
                  </div>
                  <div className="message assistant-message">
                    <div className="message-avatar assistant-avatar">
                      <Sparkles size={15} />
                    </div>
                    <div>
                      <div className="message-author">
                        Friday <span>10:42 AM</span>
                      </div>
                      <p>
                        HNSW, or{" "}
                        <strong>Hierarchical Navigable Small World</strong>, is
                        a graph-based index that makes nearest-neighbor search
                        feel less like scanning a library and more like
                        following a well-connected trail.
                      </p>
                      <p>
                        It builds multiple layers of a proximity graph. The
                        sparse upper layers help you jump quickly toward the
                        right neighborhood; the dense bottom layer gives you
                        accurate local results.
                      </p>
                      <div className="insight-card">
                        <div className="insight-title">
                          <span className="sparkle-dot">
                            <Sparkles size={13} />
                          </span>{" "}
                          Why it is fast
                        </div>
                        <div className="metric-row">
                          <div>
                            <strong>O(log N)</strong>
                            <span>Typical search complexity</span>
                          </div>
                          <div>
                            <strong>768D</strong>
                            <span>Works with embeddings</span>
                          </div>
                          <div>
                            <strong>3.2 ms</strong>
                            <span>Avg. local query</span>
                          </div>
                        </div>
                      </div>
                      <p>
                        Unlike KD-trees, HNSW remains effective in
                        high-dimensional spaces because its graph connections
                        are not constrained to axis-aligned splits.
                      </p>
                      <div className="source-row">
                        <span>Sources</span>
                        <button>
                          <BookOpen size={13} /> Vector databases explained.pdf
                        </button>
                        <button>
                          <BookOpen size={13} /> HNSW research notes.md
                        </button>
                      </div>
                    </div>
                  </div>
                  {chatMessages.map((chatMessage, index) => (
                    <div
                      className={`message ${chatMessage.role === "user" ? "user-message" : "assistant-message"}`}
                      key={`${chatMessage.role}-${index}`}
                    >
                      <div
                        className={`message-avatar ${chatMessage.role === "user" ? "user-avatar" : "assistant-avatar"}`}
                      >
                        {chatMessage.role === "user" ? (
                          "VB"
                        ) : (
                          <Sparkles size={15} />
                        )}
                      </div>
                      <div>
                        <div className="message-author">
                          {chatMessage.role === "user" ? "You" : "Friday"}{" "}
                          <span>now</span>
                        </div>
                        <p>{chatMessage.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="composer-wrap">
                  <form className="composer" onSubmit={handleSend}>
                    <textarea
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault();
                          event.currentTarget.form?.requestSubmit();
                        }
                      }}
                      placeholder="Message Friday..."
                      rows={1}
                      disabled={isSending}
                    />
                    <div className="composer-actions">
                      <button className="icon-button">
                        <Paperclip size={18} />
                      </button>
                      <button className="icon-button">
                        <ImagePlus size={18} />
                      </button>
                      <button
                        className="send-button"
                        type="submit"
                        aria-label="Send message"
                        disabled={isSending || !message.trim()}
                      >
                        <ArrowUp size={17} />
                      </button>
                    </div>
                  </form>
                  <div className="composer-note">
                    {isSending
                      ? "Friday is thinking..."
                      : "Friday can make mistakes. Check important info."}
                  </div>
                </div>
              </>
            ) : (
              <ActivityPanel view={view} />
            )}
          </section>
          <aside className="context-panel">
            <div className="context-heading">
              <div>
                <span className="eyebrow">CONTEXT</span>
                <h2>Conversation details</h2>
              </div>
              <button className="icon-button">
                <MoreHorizontal size={18} />
              </button>
            </div>
            <div className="context-section">
              <div className="section-title">
                Attached sources <span>3</span>
                <button className="tiny-button">
                  <Plus size={14} />
                </button>
              </div>
              {documents.map((doc) => (
                <div className="document-row" key={doc.name}>
                  <div className={`doc-icon ${doc.color}`}>
                    <FileText size={16} />
                  </div>
                  <div className="doc-info">
                    <strong>{doc.name}</strong>
                    <span>
                      {doc.type} · {doc.size}
                    </span>
                  </div>
                  <MoreHorizontal size={16} className="doc-more" />
                </div>
              ))}
              <button className="upload-button">
                <Upload size={15} /> Add document
              </button>
            </div>
            <div className="context-section">
              <div className="section-title">
                Model{" "}
                <button className="tiny-button">
                  <ChevronDown size={14} />
                </button>
              </div>
              <div className="model-picker">
                <div className="model-icon">
                  <Sparkles size={15} />
                </div>
                <div>
                  <strong>llama3.2</strong>
                  <span>Local · 8B parameters</span>
                </div>
                <span className="model-live" />
              </div>
            </div>
            <div className="context-section">
              <div className="section-title">Search settings</div>
              <div className="setting-row">
                <span>Retrieval count</span>
                <strong>3 chunks</strong>
              </div>
              <div className="setting-row">
                <span>Distance metric</span>
                <strong>Cosine</strong>
              </div>
              <div className="setting-row">
                <span>Index</span>
                <strong>
                  HNSW <span className="green-check">✓</span>
                </strong>
              </div>
            </div>
            <div className="context-footer">
              <span className="status-dot" /> Your data stays on this device
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function ActivityPanel({ view }: { view: string }) {
  return (
    <div className="activity-panel">
      <div className="empty-or-activity">
        <div className="activity-icon">
          <Activity size={23} />
        </div>
        <h2>
          {view === "Documents"
            ? "Your knowledge base"
            : view === "Activity"
              ? "Activity overview"
              : "Conversation history"}
        </h2>
        <p>
          {view === "Documents"
            ? "Add files to give Friday more context."
            : view === "Activity"
              ? "A quick look at how your local assistant is being used."
              : "Your recent conversations will appear here."}
        </p>
        <button className="primary-button">
          <Plus size={16} />{" "}
          {view === "Documents" ? "Add a document" : "Start a conversation"}
        </button>
      </div>
    </div>
  );
}
