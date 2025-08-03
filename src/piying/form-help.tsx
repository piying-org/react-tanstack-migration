import { PI_VIEW_FIELD_TOKEN, useSignalToRef } from '@piying/view-react';
import { useCallback, useContext, useMemo, useState } from 'react';
import JSONFormatter from 'json-formatter-js';
import { errorString } from './util/error-string';
import { INVALID, PENDING, VALID } from '@piying/view-core';
import { filter, skip, take, takeWhile } from 'rxjs';
interface FormHelpOptions {
  forceEnableSubmit?: boolean;
  asyncSubmit?: boolean;
}
export function FormHelp(props: FormHelpOptions) {
  const field = useContext(PI_VIEW_FIELD_TOKEN)!;
  const props2 = useSignalToRef(field, () => field?.props());

  const control = field.form.root;
  const value = useSignalToRef(control, (control) => control!.value$$());

  const formatedHtml = useMemo(() => new JSONFormatter(value).render(), [value]);
  const forceShowError = useSignalToRef(field, (field) => field.props()['forceShowError']);
  const hasError = useSignalToRef(control, (control) => !!control.errors);
  const isPending = useSignalToRef(control, (control) => {
    return control.status$$() === PENDING;
  });
  const isChangedStatus = useSignalToRef(control, (control) => control?.dirty$$() || control?.touched$$());
  const errors = control.errors;
  const errorStr$$ = useMemo(() => {
    if (!errors) {
      return '';
    }
    return errorString(errors);
  }, [errors]);
  const [initData, setInitData] = useState(undefined);

  const submit = useCallback(async () => {
    setSubmitting(true);
    if (props2['submitDelay']) {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, props2['submitDelay']);
      });
    }
    field.form.root!.emitSubmit();
    if (props.asyncSubmit) {
      field.form.root.statusChanges
        .pipe(
          skip(1),
          takeWhile((item) => item !== INVALID),
          filter((item) => item === VALID),
          take(1)
        )
        .subscribe((_) => {
          alert(JSON.stringify(field.form.root.value, undefined, 4));
          setSubmitting(false);
        });
      return;
    }

    alert(JSON.stringify(field.form.root.value, undefined, 4));
    setSubmitting(false);
  }, [props2, field, props.asyncSubmit]);
  const resetForm = useCallback(() => {
    control.reset(initData);
  }, [initData]);
  const saveInit = useCallback(() => {
    setInitData(value);
  }, [value]);
  const [isSubmitting, setSubmitting] = useState(false);
  return (
    <>
      <div>
        <div
          ref={(instance) => {
            if (instance) {
              instance.innerHTML = '';
              instance.appendChild(formatedHtml);
            }
          }}
        ></div>
        {forceShowError || (hasError && isChangedStatus && !isPending) ? (
          <div>
            <label className="label">Form Error</label>
            <pre className="mt-2 text-error">{errorStr$$}</pre>
          </div>
        ) : undefined}
        {isPending ? <div>Pending...</div> : undefined}
        <div className="flex gap-2 items-center">
          <input
            type="submit"
            disabled={!props.forceEnableSubmit && (control.invalid || isSubmitting)}
            className="btn btn-primary"
            onClick={submit}
          />
          <input type="reset" className="btn btn-outline btn-secondary" onClick={resetForm} />
          <button className="btn btn-outline btn-accent" onClick={saveInit}>
            Update Intial Values
          </button>
        </div>
      </div>
    </>
  );
}
