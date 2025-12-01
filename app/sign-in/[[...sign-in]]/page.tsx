import { SignIn } from "@clerk/nextjs";

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
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "glass border-2 shadow-2xl",
              headerTitle: "text-2xl font-bold",
              headerSubtitle: "text-sm opacity-90",
              formButtonPrimary: "font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200",
              formFieldInput: "placeholder:text-sm placeholder:opacity-60 focus:ring-2 focus:ring-accent/20 transition-all duration-200 rounded-lg",
              formFieldLabel: "text-sm font-medium mb-2",
              footerActionLink: "text-sm font-medium transition-colors duration-200",
              footerActionText: "text-sm opacity-75",
              socialButtonsBlockButton: "border hover:backdrop-blur-sm transition-all duration-200 rounded-lg",
              dividerLine: "opacity-20",
              dividerText: "text-sm opacity-75 bg-gray-900 px-2",
              identityPreview: "border transition-all duration-200 rounded-lg",
              identityPreviewText: "text-sm",
              identityPreviewEditButton: "text-sm font-medium transition-colors duration-200 hover:text-accent",
            }
          }}
        />
      </div>
    </div>
  );
}