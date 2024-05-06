import "@mantine/core/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  /** Put your mantine theme override here */
});

import DiagnosisIntro from "@/components/diagnosisIntro";
import DiagnosisStepper from "@/components/diagnosisStepper";
import DocChat from "@/components/docChat";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [page, setPage] = useState(0);

  return (
    <MantineProvider theme={theme}>
      <div>
        {page == 0 && <DiagnosisIntro page={page} setPage={setPage} />}
        {page == 1 && <DiagnosisStepper page={page} setPage={setPage} />}
        {page == 2 && <DocChat page={page} setPage={setPage} />}
      </div>
    </MantineProvider>
  );
}
