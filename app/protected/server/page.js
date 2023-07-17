"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProtectedComponent from "@/components/Global/Protected";
import { getServerSession } from "next-auth";

const PortectedServerPage = async () => {
  const session = await getServerSession(authOptions);
  // console.log(session);
  return (
    <div>
      <h1>
        This is a <i style={{ color: "red" }}>Server Side </i> Protected Page
      </h1>
      <ProtectedComponent user={session?.user} />
    </div>
  );
};

export default PortectedServerPage;
