import { MantineProvider } from '@mantine/core';

export function MantineWrapper(props: { children: any }) {
  return (
    <>
      <MantineProvider>{props.children}</MantineProvider>
    </>
  );
}
