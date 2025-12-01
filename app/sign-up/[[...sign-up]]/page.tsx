import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundColor: 'var(--bg-primary)',
        backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(255, 168, 156, 0.05), transparent 40%)'
      }}
    >
      <div className="w-full max-w-md p-6">
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "glass border-2 shadow-2xl",
              headerTitle: "text-2xl font-bold",
              headerSubtitle: "text-sm opacity-90",
              socialButtonsBlockButton: "bg-gray-800 hover:bg-gray-700 text-white border border-gray-600",
              dividerLine: "bg-gray-700",
              dividerText: "text-gray-400 text-sm bg-gray-900",
              formFieldLabel: "text-sm font-medium",
              formFieldInput: "bg-gray-800 border-gray-600 placeholder-gray-500 focus:border-accent focus:ring-2 focus:ring-accent/20",
              formButtonPrimary: "bg-accent hover:bg-accent-hover font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200",
              footerActionLink: "text-accent hover:text-accent-hover text-sm font-medium",
              footerActionText: "text-sm opacity-75",
              identityPreview: "bg-gray-800/50 border border-gray-600",
              identityPreviewText: "text-sm",
              identityPreviewEditButton: "text-accent hover:text-accent-hover",
              captchaContainer: "bg-gray-800 border border-gray-600 rounded-lg",
            }
          }}
        />
      </div>
    </div>
  );
}