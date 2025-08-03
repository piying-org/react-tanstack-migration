import * as v from 'valibot';
import {
  setComponent,
  patchInputs,
  NFCSchema,
  setWrappers,
  formConfig,
  patchAsyncAttributes,
  VALID,
} from '@piying/view-core';
import { fieldConfig } from '../piying/define';
import { CustomNgBuilder } from '../piying/custom.builder';
import { PiyingView } from '@piying/view-react';
import { debounceTime, pipe } from 'rxjs';
import { computed } from 'static-injector';
const schema = v.pipe(
  v.object({
    firstName: v.pipe(
      v.string(),
      v.minLength(3),
      v.title('First Name:'),
      setWrappers(['label', 'validator']),
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
    lastName: v.pipe(v.string(), setWrappers(['label', 'validator']), v.title('Last Name:')),
    __Submit: v.pipe(
      NFCSchema,
      patchInputs({ label: 'Submit(Context)' }),
      patchAsyncAttributes({
        disabled: (field) => {
          return computed(() => {
            return field.form.root.status$$() !== VALID;
          });
        },
        onClick: (field) => {
          return async () => {
            await field.context.saveUser(field.form.root.value$$());
            const data = await field.context.getData();
            console.log(data);
            field.form.root.reset(field.context.getData());
          };
        },
      }),
      setComponent('button')
    ),
    __formHelper: v.pipe(NFCSchema, setComponent('formHelper')),
  }),
  setComponent('fieldset')
);
const options = {
  fieldGlobalConfig: fieldConfig,
  builder: CustomNgBuilder,
};
class DB {
  private data: { firstName: string; lastName: string };

  constructor() {
    this.data = { firstName: 'FirstName', lastName: 'LastName' };
  }

  getData(): { firstName: string; lastName: string } {
    return { ...this.data };
  }

  async saveUser(value: { firstName: string; lastName: string }) {
    this.data = value;
    return value;
  }
}
const db = new DB();

export function QueryIntegration() {
  function modelChange(event: any) {
    console.log(event);
  }
  const initValue = { firstName: '', lastName: '' };
  const context = {
    saveUser: (value: any) => {
      db.saveUser(value);
    },
    getData: () => {
      return db.getData();
    },
  };
  return (
    <>
      <PiyingView schema={schema} options={{ ...options, context }} modelChange={modelChange} model={initValue}></PiyingView>
    </>
  );
}
