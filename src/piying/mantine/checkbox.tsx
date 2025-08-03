import type { ControlValueAccessor } from '@piying/view-core';
import { CVA, PI_VIEW_FIELD_TOKEN, useControlValueAccessor, useSignalToRef } from '@piying/view-react';
import { useContext, useImperativeHandle } from 'react';
import { Checkbox } from '@mantine/core';
import '@mantine/core/styles.css'

interface PiInputOptions {
  [CVA]: React.RefObject<ControlValueAccessor>;
}
export function MantineCheckbox(props: PiInputOptions) {
  const { cva, cvaa } = useControlValueAccessor();
  useImperativeHandle(props[CVA], () => cva, [cva]);
  const field = useContext(PI_VIEW_FIELD_TOKEN)!;
  const attributes = useSignalToRef(field, () => field?.attributes());
  const props2 = useSignalToRef(field, () => field?.props());

  return (
    <>
      <span>
        <Checkbox
          {...attributes}
          label={props2['title'] ?? ''}
          disabled={cvaa.disabled}
          checked={cvaa.value ?? false}
          onChange={(event) => cvaa.valueChange(event.target.checked)}
          onBlur={cvaa.touchedChange}
        ></Checkbox>
      </span>
    </>
  );
}
