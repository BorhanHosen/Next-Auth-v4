"use client";
import { useSession } from "next-auth/react";
const ProtectedComponent = ({ user }) => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <p>
      You are logged in as <b>{session?.user?.name || user?.name}</b>
    </p>
  );
};

export default ProtectedComponent;
