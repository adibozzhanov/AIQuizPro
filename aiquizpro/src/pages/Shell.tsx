import { AppShell } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { Outlet } from "react-router";

function LayoutShell() {
  const { height } = useViewportSize();

  return (
    <AppShell
      transitionDuration={500}
      transitionTimingFunction="ease-in-out"
      padding="md"
    >
      <AppShell.Main h={height}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default LayoutShell;
