"use client";
import Form from "../Global/Form";
import { UpdateUser } from "@/actions/authActions";
import Button from "../Global/Button";

const ProfileUpdate = ({ update }) => {
  const handleUpdateProfile = async (formData) => {
    const name = formData.get("name");
    const image = formData.get("image");

    if (update) {
      // When update() is run client side, the page will re-render
      // server side won't re-render
      update({ name, image });
    }

    const res = await UpdateUser({ name, image });
    if (res?.msg) alert(res.msg);
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <Form action={handleUpdateProfile} style={{ margin: "20px 0" }}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="text" name="image" placeholder="Image" required />
        <Button value="Update Profile" />
      </Form>
    </div>
  );
};

export default ProfileUpdate;
