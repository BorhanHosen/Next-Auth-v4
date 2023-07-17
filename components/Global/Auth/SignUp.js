"use client";
import Form from "../Global/Form";
import Button from "../Global/Button";
import { signUpWithCredentials } from "@/actions/authActions";
import Link from "next/link";

const SignUp = () => {
  const handleSignUpCredentials = async (formData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    console.log({ name, email, password });
    const res = await signUpWithCredentials({ name, email, password });
    if (res?.msg) alert(res.msg);
  };

  return (
    <div>
      <h2>Sign Up With NextAuth</h2>
      <Form action={handleSignUpCredentials}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="text" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <Button value="Register" />
      </Form>
      <div style={{ margin: "30px 0" }}>
        <Link href="/signin">Sign In</Link>
      </div>
    </div>
  );
};

export default SignUp;
