"use client";

import { useState, useEffect } from "react";
import { getAllResponses } from "../actions";

const AMBER = "#C17B3A";

type Response = {
  id: string;
  created_at: string;
  answers: Record<string, unknown>;
  metadata: Record<string, unknown>;
};

function flattenAnswers(answers: Record<string, unknown>): Record<string, string> {
  const flat: Record<string, string> = {};
  for (const [key, val] of Object.entries(answers)) {
    flat[key] = Array.isArray(val) ? val.join("; ") : String(val ?? "");
  }
  return flat;
}

function toCSV(rows: Response[]): string {
  if (!rows.length) return "";
  const allKeys = Array.from(
    new Set(rows.flatMap((r) => Object.keys(flattenAnswers(r.answers))))
  );
  const headers = ["id", "created_at", ...allKeys, "user_agent"];
  const lines = rows.map((r) => {
    const flat = flattenAnswers(r.answers);
    const ua = String((r.metadata as Record<string, unknown>)?.user_agent ?? "");
    return [
      r.id,
      r.created_at,
      ...allKeys.map((k) => `"${(flat[k] ?? "").replace(/"/g, '""')}"`),
      `"${ua.replace(/"/g, '""')}"`,
    ].join(",");
  });
  return [headers.join(","), ...lines].join("\n");
}

function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState(false);
  const [responses, setResponses] = useState<Response[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Check sessionStorage on mount
  useEffect(() => {
    if (sessionStorage.getItem("survey_admin_authed") === "true") {
      setAuthed(true);
    }
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    getAllResponses().then((result) => {
      setLoading(false);
      if (result.error) {
        setLoadError(result.error);
      } else {
        setResponses(result.data);
      }
    });
  }, [authed]);

  const handleLogin = () => {
    const correct = process.env.NEXT_PUBLIC_SURVEY_ADMIN_PASSWORD;
    if (password === correct) {
      sessionStorage.setItem("survey_admin_authed", "true");
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center p-5">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8">
          <p className="text-xs uppercase tracking-widest text-[#C17B3A] font-mono mb-1">Admin</p>
          <h1 className="text-xl font-bold text-stone-800 mb-6">Accès réservé</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Mot de passe"
            className={`w-full p-3 rounded-lg border text-sm focus:outline-none transition-colors
              ${pwError ? "border-red-400 bg-red-50" : "border-stone-200 focus:border-[#C17B3A]"}`}
          />
          {pwError && <p className="text-xs text-red-500 mt-2">Mot de passe incorrect.</p>}
          <button
            onClick={handleLogin}
            className="w-full mt-4 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: AMBER }}
          >
            Accéder
          </button>
        </div>
      </div>
    );
  }

  const first = responses?.at(-1)?.created_at;
  const last = responses?.at(0)?.created_at;

  return (
    <div className="min-h-screen bg-[#FAFAF8] p-5 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-[#C17B3A] font-mono mb-1">Mama Shaima — Admin</p>
          <h1 className="text-2xl font-bold text-stone-800">Réponses au sondage</h1>
        </div>

        {loading && <p className="text-stone-500 text-sm">Chargement...</p>}
        {loadError && <p className="text-red-500 text-sm">{loadError}</p>}

        {responses !== null && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-xl border border-stone-100 p-5 shadow-sm">
                <p className="text-3xl font-bold text-stone-800">{responses.length}</p>
                <p className="text-xs text-stone-400 mt-1 uppercase tracking-widest font-mono">Réponses totales</p>
              </div>
              <div className="bg-white rounded-xl border border-stone-100 p-5 shadow-sm">
                <p className="text-sm font-semibold text-stone-700">
                  {first ? new Date(first).toLocaleDateString("fr-FR") : "—"}
                </p>
                <p className="text-xs text-stone-400 mt-1 uppercase tracking-widest font-mono">Première réponse</p>
              </div>
              <div className="bg-white rounded-xl border border-stone-100 p-5 shadow-sm">
                <p className="text-sm font-semibold text-stone-700">
                  {last ? new Date(last).toLocaleDateString("fr-FR") : "—"}
                </p>
                <p className="text-xs text-stone-400 mt-1 uppercase tracking-widest font-mono">Dernière réponse</p>
              </div>
            </div>

            {/* Export buttons */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={() => downloadFile(toCSV(responses), "survey_responses.csv", "text/csv")}
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: AMBER }}
              >
                Exporter en CSV
              </button>
              <button
                onClick={() =>
                  downloadFile(JSON.stringify(responses, null, 2), "survey_responses.json", "application/json")
                }
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-stone-700 border border-stone-200 bg-white hover:border-stone-300 transition-colors"
              >
                Exporter en JSON
              </button>
            </div>

            {/* Response list */}
            {responses.length === 0 ? (
              <p className="text-stone-400 text-sm">Aucune réponse pour le moment.</p>
            ) : (
              <div className="space-y-3">
                {responses.map((r, i) => (
                  <div key={r.id} className="bg-white rounded-xl border border-stone-100 p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-xs font-mono text-stone-400">#{responses.length - i} — {r.id.substring(0, 8)}...</p>
                      <p className="text-xs text-stone-400">
                        {new Date(r.created_at).toLocaleString("fr-FR")}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {Object.entries(flattenAnswers(r.answers))
                        .filter(([, v]) => v)
                        .slice(0, 6)
                        .map(([k, v]) => (
                          <div key={k} className="text-xs">
                            <span className="text-stone-400 font-mono">{k}: </span>
                            <span className="text-stone-600">{v.substring(0, 40)}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <button
          onClick={() => {
            sessionStorage.removeItem("survey_admin_authed");
            setAuthed(false);
          }}
          className="mt-10 text-xs text-stone-400 hover:text-stone-600 transition-colors"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
