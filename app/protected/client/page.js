"use client";

import ProtectedComponent from "@/components/Global/Protected";

const ProtectedClientPage = () => {
  return (
    <div>
      <h1>
        This is a <i style={{ color: "red" }}>Client Side </i> Protected Page
      </h1>
      <ProtectedComponent />
    </div>
  );
};

export default ProtectedClientPage;
