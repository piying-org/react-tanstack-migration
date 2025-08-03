import type { ControlValueAccessor } from '@piying/view-core';
import { CVA, PI_VIEW_FIELD_TOKEN, useControlValueAccessor, useSignalToRef } from '@piying/view-react';
import { useContext, useImperativeHandle } from 'react';
import { TextInput } from '@mantine/core';
import '@mantine/core/styles.css'

interface PiInputOptions {
  [CVA]: React.RefObject<ControlValueAccessor>;
}
export function MantineTextField(props: PiInputOptions) {
  const { cva, cvaa } = useControlValueAccessor();
  useImperativeHandle(props[CVA], () => cva, [cva]);
  const field = useContext(PI_VIEW_FIELD_TOKEN)!;
  const attributes = useSignalToRef(field, () => field?.attributes());
  const props2 = useSignalToRef(field, (field) => {
    return field.props();
  });

  return (
    <>
      <TextInput
        label={props2['title']}
        onBlur={cvaa.touchedChange}
        disabled={cvaa.disabled}
        value={cvaa.value ?? ''}
        onChange={(event) => cvaa.valueChange(event.target.value)}
        {...attributes}
      ></TextInput>
    </>
  );
}
