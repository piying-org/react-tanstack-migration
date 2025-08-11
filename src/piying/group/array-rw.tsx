import { PI_VIEW_FIELD_TOKEN, useSignalToRef, PiyingFieldTemplate } from '@piying/view-react';
import clsx from 'clsx';
import { useCallback, useContext, useMemo } from 'react';
export function ArrayRwGroup(props: { minLength: number; initItem?: (index: number) => any }) {
  const field = useContext(PI_VIEW_FIELD_TOKEN)!;
  const props2 = useSignalToRef(field, (field) => field?.props());

  const remove = useCallback(
    (index: number) => {
      field.action.remove(index);
    },
    [field]
  );
  const children = useSignalToRef(field, (field) => field?.children!())!;
  const add = useCallback(() => {
    field.action.set(props.initItem?.(children.length));
  }, [field, props.initItem, children]);

  const btnDisabled = useMemo(() => children.length <= props.minLength, [children, props.minLength]);
  const itemClass = useMemo(() => {
    return clsx('btn btn-circle btn-soft btn-error', { 'btn-disabled': btnDisabled });
  }, [btnDisabled]);
  return (
    <>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-full">
        {props2?.['title'] ? <legend className="fieldset-legend">{props2['title']}</legend> : undefined}
        {children.map((field, index) => {
          return (
            <div key={index} className="flex items-center gap-2 *:first:flex-1">
              <PiyingFieldTemplate field={field} key={index}></PiyingFieldTemplate>
              <button className={itemClass} onClick={() => remove(index)} aria-disabled={btnDisabled}>
                🗑️
              </button>
            </div>
          );
        })}
        <button className="btn" onClick={add}>
          ➕
        </button>
      </fieldset>
    </>
  );
}
