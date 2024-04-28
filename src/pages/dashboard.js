import MainAppShell from "@/components/MainAppShell";
import DefaultDashboard from '@/components/dashboard_default';
import { useState } from "react";

export default function Dashboard() {
    const [page,setPage] = useState(0)
    return (
        <MainAppShell>
            {page==0 && <DefaultDashboard />}
        </MainAppShell>
    )
}
