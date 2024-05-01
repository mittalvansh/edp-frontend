import Diagnosing from "@/components/diagnosinging";
import DiagnosisIntro from "@/components/diagnosisIntro";
import { useState } from "react";


export default function Diagnosis() {
  const [page, setPage] = useState(0);

  return (
    <div>
    {page == 0 && <DiagnosisIntro page={page} setPage={setPage} />}
    {page == 1 && <Diagnosing page={page} setPage={setPage} />}
    </div>
  );
}
