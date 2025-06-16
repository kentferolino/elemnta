import LoginForm from "@/components/login/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Elemnta</h1>
          <p className="text-muted-foreground">
            Enter your credentials to sign in
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
