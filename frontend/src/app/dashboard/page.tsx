import Navbar from "@/components/base/Navbar";
import { AddPromo } from "@/components/promopick/AddPromo";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="container mx-auto px-4">
      <Navbar />
      <div className="mt-10 flex justify-end">
        <AddPromo />
      </div>
    </div>
  );
};

export default DashboardPage;
