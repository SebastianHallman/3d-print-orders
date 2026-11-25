import LoginForm from "@/components/loginForm";

export default function LoginPage() {
  return (
    <main className="mx-auto grid min-h-dvh w-full max-w-md items-center px-4 py-8">
      <div className="rounded-3xl bg-background p-6 text-foreground shadow-2xl sm:p-8">
        <h1 className="mb-6 text-3xl font-bold">Admin login</h1>
        <LoginForm />
      </div>
    </main>
  );
}
