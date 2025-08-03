import type { ControlValueAccessor } from '@piying/view-core';
import { CVA, PI_VIEW_FIELD_TOKEN, useControlValueAccessor, useSignalToRef } from '@piying/view-react';
import { useContext, useImperativeHandle, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import { errorString } from '../util/error-string';

interface PiInputOptions {
  [CVA]: React.RefObject<ControlValueAccessor>;
}
export function MuiTextField(props: PiInputOptions) {
  const { cva, cvaa } = useControlValueAccessor();
  useImperativeHandle(props[CVA], () => cva, [cva]);
  const field = useContext(PI_VIEW_FIELD_TOKEN)!;
  const attributes = useSignalToRef(field, () => field?.attributes());
  const props2 = useSignalToRef(field, (field) => {
    return field.props();
  });
  const error = useSignalToRef(field, (field) => {
    return field.form.control!.dirty$$() || field.form.control!.touched$$() ? errorString(field.form.control?.errors) : '';
  });
  const errorHasError = useMemo(() => !!error, [error]);
  return (
    <>
      <TextField
        error={errorHasError}
        helperText={error}
        label={props2['title']}
        onBlur={cvaa.touchedChange}
        disabled={cvaa.disabled}
        value={cvaa.value ?? ''}
        onChange={(event) => cvaa.valueChange(event.target.value)}
        {...attributes}
      ></TextField>
    </>
  );
}
