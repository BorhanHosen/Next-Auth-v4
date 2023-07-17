import ResetPasswordComponent from "@/components/Global/Auth/ResetPassword";

const ResetPasswordPage = ({ searchParams: { token } }) => {
  return <ResetPasswordComponent token={token} />;
};

export default ResetPasswordPage;
