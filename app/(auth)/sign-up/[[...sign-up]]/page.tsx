import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      signInFallbackRedirectUrl={"/"}
      signInUrl="/sign-upn"
      fallbackRedirectUrl={"/"}
    />
  );
}
