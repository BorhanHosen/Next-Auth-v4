import { ChangePasswordWithCredentials } from "@/actions/authActions";
import Button from "../Global/Button";
import Form from "../Global/Form";

const ChangePassword = () => {
  const handleChangePassword = async (formData) => {
    const old_password = formData.get("old_password");
    const new_password = formData.get("new_password");
    console.log({ old_password, new_password });
    const res = await ChangePasswordWithCredentials({
      old_password,
      new_password,
    });
    if (res?.msg) {
      alert(res?.msg);
    }
  };

  return (
    <div>
      <h1>Change Password </h1>
      <Form action={handleChangePassword} style={{ margin: "20px 0" }}>
        <input
          type="password"
          name="old_password"
          placeholder="Old password"
          required
        />
        <input
          type="password"
          name="new_password"
          placeholder="New password"
          required
        />
        <Button value="Change Password " />
      </Form>
    </div>
  );
};

export default ChangePassword;
