export default function Resume() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <embed
        src="/pdf/resume.pdf"
        type="application/pdf"
        className="w-full h-full"
      />
    </div>
  );
}
