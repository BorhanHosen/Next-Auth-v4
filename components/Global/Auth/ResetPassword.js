"use client";
import Form from "../Global/Form";
import Button from "../Global/Button";
import { ResetPasswordWithCredentials } from "@/actions/authActions";

const ResetPasswordComponent = ({ token }) => {
  const handleResetPassword = async (formData) => {
    const password = formData.get("password");
    const res = await ResetPasswordWithCredentials({ token, password });
    if (res?.msg) alert(res?.msg);
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <Form action={handleResetPassword}>
        <input
          type="password"
          name="password"
          placeholder="password"
          required
        />
        <Button value="Reset Password" />
      </Form>
    </div>
  );
};

export default ResetPasswordComponent;
