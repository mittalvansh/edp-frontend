import { useState } from "react";
import DefaultDashboard from "@/components/dashboard_default";
import DashboardMedicalReport from "@/components/dashboard_medical_report";
import DashboardPrescription from "@/components/dashboard_prescription";

export default function Dashboard() {
  const [page, setPage] = useState(0);
  return (
    <div>
      {page == 0 && <DefaultDashboard page={page} setPage={setPage} />}
      {page == 1 && <DashboardMedicalReport page={page} setPage={setPage} />}
      {page == 2 && <DashboardPrescription page={page} setPage={setPage} />}
    </div>
  );
}
