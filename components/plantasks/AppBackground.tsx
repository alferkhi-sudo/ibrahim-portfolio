export default function AppBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0b0c10] dark:bg-[#0b0c10]">
      <div
        className="absolute -top-1/4 -left-1/4 h-[70vw] w-[70vw] rounded-full opacity-60 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(91,127,222,0.55), transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-1/4 -right-1/4 h-[70vw] w-[70vw] rounded-full opacity-50 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.45), transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/3 right-0 h-[50vw] w-[50vw] rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(242,184,75,0.35), transparent 70%)",
        }}
      />
    </div>
  );
}
