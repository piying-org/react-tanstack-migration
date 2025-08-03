import * as v from 'valibot';
import { setComponent, NFCSchema, setWrappers, patchAttributes } from '@piying/view-core';
import { fieldConfig } from '../piying/define';
import { CustomNgBuilder } from '../piying/custom.builder';
import { PiyingView } from '@piying/view-react';
const schema = v.pipe(
  v.object({
    firstName: v.pipe(
      v.string(),
      patchAttributes({
        placeholder: 'Enter your name',
      }),
      setComponent('mantine-input')
    ),
    lastName: v.pipe(
      v.string(),
      patchAttributes({
        placeholder: 'Enter your last name',
      }),
      setComponent('mui-input')
    ),
    isChecked: v.pipe(v.boolean(), setComponent('mantine-checkbox')),
    isMuiCheckBox: v.pipe(v.boolean(), setComponent('mui-checkbox')),
    __formHelper: v.pipe(NFCSchema, setComponent('formHelper')),
  }),
  setComponent('fieldset'),
  setWrappers(['mantine'])
);
const options = {
  fieldGlobalConfig: fieldConfig,
  builder: CustomNgBuilder,
};
export function UiLibraries() {
  function modelChange(event: any) {
    console.log(event);
  }
  const initValue = { firstName: '', lastName: '', isChecked: false, isMuiCheckBox: false };
  return (
    <>
      <PiyingView schema={schema} options={options} modelChange={modelChange} model={initValue}></PiyingView>
    </>
  );
}
