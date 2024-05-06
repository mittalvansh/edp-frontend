import "@mantine/core/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  /** Put your mantine theme override here */
});

import { useState } from "react";
import DiagnosisIntro from "@/_components/diagnosisIntro";
import DiagnosisStepper from "@/_components/diagnosisStepper";
import DocChat from "@/_components/docChat";

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
