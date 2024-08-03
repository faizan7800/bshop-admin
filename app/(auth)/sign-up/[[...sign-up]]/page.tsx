import { SignUp } from "@clerk/nextjs";
export default function Page() {

  return (
  <div className="h-screen w-screen my-4 flex justify-center items-center">
  <SignUp />
  </div>
);
}