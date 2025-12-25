import * as v from 'valibot';
import { setComponent, NFCSchema, actions, formConfig } from '@piying/view-core';
import { fieldConfig } from '../piying/define';
import { CustomNgBuilder } from '../piying/custom.builder';
import { PiyingView } from '@piying/view-react';
import { debounceTime, pipe } from 'rxjs';
const schema = v.pipe(
  v.object({
    firstName: v.pipe(
      v.string(),
      v.minLength(3),
      v.title('First Name:'),
      actions.wrappers.set(['label', 'validator']),
      formConfig({
        pipe: { toModel: pipe(debounceTime(500)) },
        asyncValidators: [
          async (control) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            if (control.value?.includes('error')) {
              return { error: 'No "error" allowed in first name' };
            }
            return undefined;
          },
        ],
      })
    ),
    lastName: v.pipe(v.string(), actions.wrappers.set(['label', 'validator']), v.title('Last Name:')),

    __formHelper: v.pipe(NFCSchema, setComponent('formHelper')),
  }),
  setComponent('fieldset')
);
const options = {
  fieldGlobalConfig: fieldConfig,
  builder: CustomNgBuilder,
};
export function Simple() {
  function modelChange(event: any) {
    console.log(event);
  }
  const initValue = { firstName: '', lastName: '' };
  return (
    <>
      <PiyingView schema={schema} options={options} modelChange={modelChange} model={initValue}></PiyingView>
    </>
  );
}
