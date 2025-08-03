import type { ControlValueAccessor } from '@piying/view-core';
import { CVA, PI_VIEW_FIELD_TOKEN, useControlValueAccessor, useSignalToRef } from '@piying/view-react';
import { useContext, useImperativeHandle } from 'react';
import Checkbox from '@mui/material/Checkbox';

interface PiInputOptions {
  [CVA]: React.RefObject<ControlValueAccessor>;
}
export function MuiCheckbox(props: PiInputOptions) {
  const { cva, cvaa } = useControlValueAccessor();
  useImperativeHandle(props[CVA], () => cva, [cva]);
  const field = useContext(PI_VIEW_FIELD_TOKEN)!;
  const attributes = useSignalToRef(field, () => field?.attributes());

  return (
    <>
      <span>
        <Checkbox
          {...attributes}
          disabled={cvaa.disabled}
          checked={cvaa.value ?? false}
          onChange={(event) => cvaa.valueChange(event.target.checked)}
          onBlur={cvaa.touchedChange}
        ></Checkbox>
      </span>
    </>
  );
}
