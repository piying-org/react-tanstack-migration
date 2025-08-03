import { PI_VIEW_FIELD_TOKEN, useSignalToRef } from '@piying/view-react';
import clsx from 'clsx';
import { useContext, useMemo } from 'react';
import { Checkbox, MantineProvider, TextInput } from '@mantine/core';

export function MantineWrapper(props: { children: any }) {
  return (
    <>
      <MantineProvider>{props.children}</MantineProvider>
    </>
  );
}
