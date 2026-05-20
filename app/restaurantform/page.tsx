"use client";

import { useState } from "react";
import { submitSurvey } from "./actions";

const AMBER = "#C17B3A";
const TOTAL_STEPS = 6;

type Answers = Record<string, string | string[]>;

// ─── Reusable field components ───────────────────────────────────────────────

function Radio({
  options, value, onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 mt-2">
      {options.map((opt) => (
        <label
          key={opt}
          onClick={() => onChange(opt)}
          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-150 text-sm
            ${value === opt
              ? "border-[#C17B3A] bg-[#C17B3A]/8 text-[#7a4a1e] font-medium"
              : "border-stone-200 bg-white hover:border-[#C17B3A]/50 text-stone-700"
            }`}
        >
          <span
            className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all
              ${value === opt ? "border-[#C17B3A]" : "border-stone-300"}`}
          >
            {value === opt && (
              <span className="w-2 h-2 rounded-full bg-[#C17B3A]" />
            )}
          </span>
          {opt}
        </label>
      ))}
    </div>
  );
}

function Checkbox({
  options, value, onChange, max,
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  max?: number;
}) {
  const handleToggle = (opt: string) => {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt));
    } else if (!max || value.length < max) {
      onChange([...value, opt]);
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-2">
      {max && (
        <p className="text-xs text-stone-400 mb-1">Maximum {max} choix</p>
      )}
      {options.map((opt) => {
        const checked = value.includes(opt);
        const disabled = !checked && !!max && value.length >= max;
        return (
          <label
            key={opt}
            onClick={() => !disabled && handleToggle(opt)}
            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-150 text-sm
              ${checked
                ? "border-[#C17B3A] bg-[#C17B3A]/8 text-[#7a4a1e] font-medium"
                : disabled
                  ? "border-stone-100 bg-stone-50 text-stone-400 cursor-not-allowed"
                  : "border-stone-200 bg-white hover:border-[#C17B3A]/50 text-stone-700"
              }`}
          >
            <span
              className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all
                ${checked ? "border-[#C17B3A] bg-[#C17B3A]" : "border-stone-300"}`}
            >
              {checked && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            {opt}
          </label>
        );
      })}
    </div>
  );
}

function Textarea({
  name, value, onChange, placeholder,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder ?? "Votre réponse..."}
      rows={4}
      className="w-full mt-2 p-3 rounded-lg border border-stone-200 bg-white text-stone-700 text-sm resize-none focus:outline-none focus:border-[#C17B3A] transition-colors placeholder:text-stone-300"
    />
  );
}

function TextInput({
  name, value, onChange, placeholder,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder ?? "Votre réponse..."}
      className="w-full mt-2 p-3 rounded-lg border border-stone-200 bg-white text-stone-700 text-sm focus:outline-none focus:border-[#C17B3A] transition-colors placeholder:text-stone-300"
    />
  );
}

function Question({ num, label, children }: { num: number; label: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <p className="text-[11px] uppercase tracking-widest text-[#C17B3A] font-mono mb-1">Q{num}</p>
      <p className="text-stone-800 font-medium text-sm leading-relaxed">{label}</p>
      {children}
    </div>
  );
}

// ─── Steps ────────────────────────────────────────────────────────────────────

function Step1({ answers, set }: { answers: Answers; set: (k: string, v: string | string[]) => void }) {
  return (
    <>
      {/* Project intro */}
      <div className="mb-8 p-5 rounded-xl bg-white border-l-4 border-[#C17B3A] shadow-sm">
        <p className="text-xs uppercase tracking-widest text-[#C17B3A] font-mono mb-2">Le projet</p>
        <p className="text-stone-700 text-sm leading-relaxed">
          <strong>ShaiMaMa</strong> est un projet de restaurant en cours de création en Normandie (depts 27 & 76).
          Cuisine authentique préparée avec des techniques artisanales apprises en Italie, produits frais et locaux,
          ambiance soignée. Ce sondage nous aide à mieux comprendre vos attentes.
        </p>
      </div>

      <Question num={1} label="Tranche d'âge">
        <Radio options={["18–24", "25–34", "35–49", "50–64", "65+"]} value={answers.q1 as string ?? ""} onChange={(v) => set("q1", v)} />
      </Question>
      <Question num={2} label="Situation professionnelle">
        <Radio options={["Salarié cadre", "Salarié non-cadre", "Étudiant", "Indépendant", "Retraité", "Autre"]} value={answers.q2 as string ?? ""} onChange={(v) => set("q2", v)} />
      </Question>
      <Question num={3} label="Ville ou commune">
        <TextInput name="q3" value={answers.q3 as string ?? ""} onChange={(v) => set("q3", v)} placeholder="Ex. Rouen, Le Havre..." />
      </Question>
      <Question num={4} label="Niveau d'études">
        <Radio options={["Bac ou moins", "Bac+2", "Bac+3–4", "Bac+5 et plus"]} value={answers.q5 as string ?? ""} onChange={(v) => set("q5", v)} />
      </Question>
      <Question num={5} label="Composition du foyer">
        <Radio options={["Seul", "En couple sans enfant", "En couple avec enfant(s)", "Famille monoparentale", "Autre"]} value={answers.q6 as string ?? ""} onChange={(v) => set("q6", v)} />
      </Question>
    </>
  );
}

function Step2({ answers, set }: { answers: Answers; set: (k: string, v: string | string[]) => void }) {
  return (
    <>
      <Question num={6} label="À quelle fréquence allez-vous au restaurant ?">
        <Radio options={["Moins d'une fois par mois", "1 fois par mois", "2–3 fois par mois", "1 fois par semaine", "Plusieurs fois par semaine"]} value={answers.q7 as string ?? ""} onChange={(v) => set("q7", v)} />
      </Question>
      <Question num={7} label="Budget moyen par couvert (hors boissons)">
        <Radio options={["Moins de 12 €", "12–20 €", "20–30 €", "Plus de 30 €"]} value={answers.q8 as string ?? ""} onChange={(v) => set("q8", v)} />
      </Question>
      <Question num={8} label="Avec qui sortez-vous au restaurant ?">
        <Checkbox options={["En couple", "En famille", "Entre amis", "Repas professionnels", "Seul"]} value={answers.q9 as string[] ?? []} onChange={(v) => set("q9", v)} />
      </Question>
      <Question num={9} label="Recourez-vous à la livraison à domicile ?">
        <Radio options={["Jamais", "Rarement", "1–2 fois par mois", "Souvent"]} value={answers.q13 as string ?? ""} onChange={(v) => set("q13", v)} />
      </Question>
    </>
  );
}

function Step3({ answers, set }: { answers: Answers; set: (k: string, v: string | string[]) => void }) {
  return (
    <>
      <Question num={10} label="Comment évaluez-vous l'offre de restauration dans votre zone ?">
        <Radio options={["Très satisfaisante", "Plutôt satisfaisante", "Plutôt insuffisante", "Vraiment décevante"]} value={answers.q14 as string ?? ""} onChange={(v) => set("q14", v)} />
      </Question>
      <Question num={11} label="Quels types d'établissements trouvez-vous trop nombreux ?">
        <Checkbox options={["Fast-foods", "Pizzerias classiques", "Kebabs", "Brasseries industrielles", "Restaurants de chaîne", "Aucun"]} value={answers.q15 as string[] ?? []} onChange={(v) => set("q15", v)} />
      </Question>
      <Question num={12} label="Qu'est-ce qui manque dans votre zone ?">
        <Checkbox options={["Restaurant gastronomique abordable", "Cuisine du monde authentique", "Produits locaux mis en avant", "Lieu chaleureux avec bonne ambiance", "Concept original", "Rien ne manque"]} value={answers.q16 as string[] ?? []} onChange={(v) => set("q16", v)} />
      </Question>
      <Question num={13} label="Avez-vous déjà renoncé à sortir faute d'un endroit convenable ?">
        <Radio options={["Jamais", "Rarement", "Parfois", "Souvent"]} value={answers.q17 as string ?? ""} onChange={(v) => set("q17", v)} />
      </Question>
      <Question num={14} label="Si oui, pourquoi ?">
        <Textarea name="q18" value={answers.q18 as string ?? ""} onChange={(v) => set("q18", v)} placeholder="Décrivez la situation..." />
      </Question>
      <Question num={15} label="Prix juste pour un repas complet de qualité (entrée + plat + dessert)">
        <Radio options={["15–20 €", "20–28 €", "28–35 €", "Plus de 35 €"]} value={answers.q19 as string ?? ""} onChange={(v) => set("q19", v)} />
      </Question>
      <Question num={16} label="Quel prix seriez-vous prêt à payer pour un plat principal ?">
        <Radio options={["Moins de 10 €", "10–15 €", "15–20 €", "Plus de 20 €"]} value={answers.q20 as string ?? ""} onChange={(v) => set("q20", v)} />
      </Question>
    </>
  );
}

function Step4({ answers, set }: { answers: Answers; set: (k: string, v: string | string[]) => void }) {
  return (
    <>
      <Question num={17} label="Quels sont vos 3 critères les plus importants ?">
        <Checkbox max={3} options={["Qualité des produits", "Rapport qualité-prix", "Ambiance et décor", "Authenticité de la cuisine", "Rapidité du service", "Localisation", "Originalité du concept"]} value={answers.q21 as string[] ?? []} onChange={(v) => set("q21", v)} />
      </Question>
      <Question num={18} label="Ce qui vous déçoit le plus actuellement dans la restauration locale">
        <Textarea name="q22" value={answers.q22 as string ?? ""} onChange={(v) => set("q22", v)} placeholder="Vos impressions..." />
      </Question>
      <Question num={19} label="La musique influence-t-elle votre expérience au restaurant ?">
        <Radio options={["Non", "Un peu", "Oui, elle contribue à l'ambiance", "Oui, une mauvaise musique peut me faire partir"]} value={answers.q23 as string ?? ""} onChange={(v) => set("q23", v)} />
      </Question>
      <Question num={20} label="Êtes-vous sensible au parcours authentique du cuisinier ?">
        <Radio options={["Non, seul le résultat compte", "Un peu", "Oui, ça renforce ma confiance", "Oui, c'est un critère fort"]} value={answers.q24 as string ?? ""} onChange={(v) => set("q24", v)} />
      </Question>
      <Question num={21} label="Préférez-vous une carte courte ou longue ?">
        <Radio options={["Carte longue", "Carte courte, gage de fraîcheur", "Peu importe"]} value={answers.q25 as string ?? ""} onChange={(v) => set("q25", v)} />
      </Question>
      <Question num={22} label="L'identité visuelle d'un restaurant influence-t-elle votre choix avant d'y aller ?">
        <Radio options={["Non", "Un peu", "Oui", "Oui, c'est souvent mon premier filtre"]} value={answers.q26 as string ?? ""} onChange={(v) => set("q26", v)} />
      </Question>
    </>
  );
}

function Step5({ answers, set }: { answers: Answers; set: (k: string, v: string | string[]) => void }) {
  return (
    <>
      <Question num={23} label="Ce concept vous intéresse-t-il ?">
        <Radio options={["Pas du tout", "Peu", "Assez", "Beaucoup", "Énormément"]} value={answers.q27 as string ?? ""} onChange={(v) => set("q27", v)} />
      </Question>
      <Question num={24} label="Ce type d'établissement manque-t-il dans votre département ?">
        <Radio options={["Oui, clairement", "Plutôt oui", "Plutôt non", "Non"]} value={answers.q28 as string ?? ""} onChange={(v) => set("q28", v)} />
      </Question>
      <Question num={25} label="Seriez-vous dans les premiers à l'essayer ?">
        <Radio options={["Non", "Peut-être", "Probablement oui", "Oui, certainement"]} value={answers.q30 as string ?? ""} onChange={(v) => set("q30", v)} />
      </Question>
      <Question num={26} label="Recommanderiez-vous ce restaurant si vous étiez satisfait ?">
        <Radio options={["Non", "Peut-être", "Sûrement", "Oui, je recommande facilement"]} value={answers.q31 as string ?? ""} onChange={(v) => set("q31", v)} />
      </Question>
      <Question num={27} label="Qu'est-ce qui pourrait vous empêcher de venir ?">
        <Textarea name="q32" value={answers.q32 as string ?? ""} onChange={(v) => set("q32", v)} placeholder="Distance, prix, habitudes..." />
      </Question>
    </>
  );
}

function Step6({ answers, set }: { answers: Answers; set: (k: string, v: string | string[]) => void }) {
  return (
    <>
      <Question num={28} label="Comment découvrez-vous de nouveaux restaurants ?">
        <Checkbox options={["Instagram", "Google Maps", "Bouche-à-oreille", "TikTok", "Presse locale", "Passage devant"]} value={answers.q34 as string[] ?? []} onChange={(v) => set("q34", v)} />
      </Question>
      <Question num={29} label="Ce qui vous inciterait à revenir régulièrement">
        <Checkbox options={["Constance de la qualité", "Carte saisonnière", "Événements réguliers", "Relation chaleureuse avec l'équipe", "Prix stables"]} value={answers.q37 as string[] ?? []} onChange={(v) => set("q37", v)} />
      </Question>
      <Question num={30} label="Laissez-vous des avis en ligne ?">
        <Radio options={["Non, jamais", "Rarement", "Parfois", "Oui, régulièrement"]} value={answers.q38 as string ?? ""} onChange={(v) => set("q38", v)} />
      </Question>
      <Question num={31} label="Commentaire libre — vos attentes ou remarques pour ce projet">
        <Textarea name="q39" value={answers.q39 as string ?? ""} onChange={(v) => set("q39", v)} placeholder="Tout ce que vous souhaitez partager..." />
      </Question>
    </>
  );
}

const STEP_TITLES = [
  "Votre profil",
  "Habitudes de restauration",
  "Perception de l'offre locale",
  "Attentes & critères",
  "Validation du concept",
  "Communication & clôture",
];

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function RestaurantFormPage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    const result = await submitSurvey(answers, navigator.userAgent);
    setLoading(false);
    if (result.success) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setError(result.error ?? "Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const progress = (step / TOTAL_STEPS) * 100;

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center p-5">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 md:p-10 text-center">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ backgroundColor: "#C17B3A20" }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="#C17B3A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-stone-800 mb-3">Merci pour votre participation !</h1>
          <p className="text-stone-500 text-sm leading-relaxed mb-6">
            Vos réponses ont bien été enregistrées. Elles nous aideront à créer un restaurant à la hauteur de vos attentes.
          </p>
          <p className="text-xs text-stone-400 font-medium tracking-wide">— L&apos;équipe ShaiMaMa</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-stone-100">
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%`, backgroundColor: AMBER }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-5 py-10 md:py-16">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#C17B3A] font-mono mb-1">
            Étape {step} / {TOTAL_STEPS}
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-800 tracking-tight">
            {STEP_TITLES[step - 1]}
          </h1>
          {/* Step dots */}
          <div className="flex gap-1.5 mt-4">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i + 1 <= step ? AMBER : "#e7e5e4",
                  flex: i + 1 === step ? "2" : "1",
                }}
              />
            ))}
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 md:p-8">
          {step === 1 && <Step1 answers={answers} set={set} />}
          {step === 2 && <Step2 answers={answers} set={set} />}
          {step === 3 && <Step3 answers={answers} set={set} />}
          {step === 4 && <Step4 answers={answers} set={set} />}
          {step === 5 && <Step5 answers={answers} set={set} />}
          {step === 6 && <Step6 answers={answers} set={set} />}

          {error && (
            <p className="mt-4 text-sm text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-stone-100">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="px-5 py-2.5 rounded-full text-sm font-medium text-stone-500 hover:text-stone-800 disabled:opacity-30 transition-colors"
            >
              ← Retour
            </button>

            {step < TOTAL_STEPS ? (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: AMBER }}
              >
                Continuer →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: AMBER }}
              >
                {loading ? "Envoi en cours..." : "Envoyer mes réponses"}
              </button>
            )}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-stone-300 mt-8">
          Enquête confidentielle — vos données ne seront jamais revendues
        </p>
      </div>
    </div>
  );
}
