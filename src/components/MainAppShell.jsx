import { useDisclosure } from "@mantine/hooks";
import { AppShell, Stack, Image, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const styles = {
  navbar: {
    backgroundColor: "#089BAB",
    border: "none",
    borderRadius: "0 1.75rem 1.75rem 0",
  },
  menuItem: {
    container: {
      align: "center",
      justify: "center",
    },
  },
};

function MenuItem({ imgSrc, text }) {
  const isMobile = useMediaQuery("(max-width: 850px)");

  return (
    <Stack {...styles.menuItem.container}>
      <Image
        src={imgSrc}
        alt=""
        w={isMobile ? "1.5rem" : "2.5rem"}
        h={isMobile ? "1.5rem" : "2.5rem"}
      />
      <Text c="#FFF">{text}</Text>
    </Stack>
  );
}

export default function MainAppShell({ children }) {
  const [opened, { toggle }] = useDisclosure();
  const isMobile = useMediaQuery("(max-width: 850px)");

  return (
    <AppShell
      navbar={{
        width: isMobile ? 150 : 200,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Navbar style={styles.navbar} p="md">
        <Stack
          h="100%"
          justify="center"
          align="center"
          gap={isMobile ? "2rem" : "5rem"}
        >
          <MenuItem imgSrc="/Img1.svg" text="Dashboard" />
          <MenuItem imgSrc="/Img2.svg" text="Diagnosis" />
          <MenuItem imgSrc="/Img3.svg" text="History" />
          <MenuItem imgSrc="/Img4.svg" text="Log Out" />
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
