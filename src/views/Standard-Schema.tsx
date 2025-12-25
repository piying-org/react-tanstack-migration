import * as v from 'valibot';
import { setComponent, NFCSchema, actions } from '@piying/view-core';
import { fieldConfig } from '../piying/define';
import { CustomNgBuilder } from '../piying/custom.builder';
import { PiyingView } from '@piying/view-react';
const schema = v.pipe(
  v.object({
    firstName: v.pipe(
      v.string(),
      v.minLength(3, '[Valibot] You must have a length of at least 3'),
      v.startsWith('A', "[Valibot] First name must start with 'A'"),
      actions.wrappers.set(['label', 'validator']),
      v.title('First Name:')
    ),
    lastName: v.pipe(
      v.string(),
      v.title('Last Name:'),
      v.minLength(3, '[Valibot] You must have a length of at least 3'),
      actions.wrappers.set(['label', 'validator'])
    ),

    __formHelper: v.pipe(NFCSchema, setComponent('formHelper')),
  }),
  setComponent('fieldset')
);
const options = {
  fieldGlobalConfig: fieldConfig,
  builder: CustomNgBuilder,
};
export function StandardSchema() {
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
