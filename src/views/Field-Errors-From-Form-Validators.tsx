import * as v from 'valibot';
import { setComponent, NFCSchema, actions, formConfig } from '@piying/view-core';
import { fieldConfig } from '../piying/define';
import { CustomNgBuilder } from '../piying/custom.builder';
import { PiyingView } from '@piying/view-react';
const usernames = ['user-1', 'user-2', 'user-3'];
async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
const schema = v.pipe(
  v.object({
    username: v.pipe(
      v.string(),
      v.minLength(1),
      formConfig({
        updateOn: 'submit',
        asyncValidators: [
          async (control) => {
            await sleep(Math.floor(Math.random() * 500));

            if (!usernames.includes(control.value)) {
              return undefined;
            }
            return { error: 'Username is taken' };
          },
        ],
      }),
      v.title('Username:'),
      actions.wrappers.set(['label', 'validator'])
    ),
    age: v.pipe(
      v.number(),
      formConfig({
        updateOn: 'submit',
        asyncValidators: [
          async (control) => {
            await sleep(Math.floor(Math.random() * 500));

            if (control.value >= 13) {
              return undefined;
            }
            return { error: 'Must be 13 or older to sign' };
          },
        ],
      }),
      actions.wrappers.set(['label', 'validator']),
      v.title('Age:')
    ),

    __formHelper: v.pipe(
      NFCSchema,
      setComponent('formHelper'),
      actions.inputs.patch({
        forceEnableSubmit: true,
        asyncSubmit: true,
      })
    ),
  }),
  setComponent('fieldset')
);
const options = {
  fieldGlobalConfig: fieldConfig,
  builder: CustomNgBuilder,
};
export function FieldErrorsFromFormValidators() {
  function modelChange(event: any) {
    console.log(event);
  }
  const initValue = { username: '', age: 0 };
  return (
    <>
      <PiyingView schema={schema} options={options} modelChange={modelChange} model={initValue}></PiyingView>
    </>
  );
}
