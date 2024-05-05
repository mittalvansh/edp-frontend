import "@mantine/core/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  /** Put your mantine theme override here */
});

import MainAppShell from "@/components/MainAppShell";
import DocChat from "@/components/docChat";
import Diagnosing from "@/components/diagnosinging";
import DiagnosisIntro from "@/components/diagnosisIntro";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [page, setPage] = useState(0);

  return (
    <MantineProvider theme={theme}>
      <div>
      {page == 0 && <DiagnosisIntro page={page} setPage={setPage} />}
      {page == 1 && <Diagnosing page={page} setPage={setPage} />}
      {page == 2 && <DocChat page={page} setPage={setPage} />}
    </div>
    </MantineProvider>
  );
}
