import * as v from 'valibot';
import { setComponent, actions, NFCSchema } from '@piying/view-core';
import { fieldConfig } from '../piying/define';
import { CustomNgBuilder } from '../piying/custom.builder';
import { PiyingView } from '@piying/view-react';
const schema = v.pipe(
  v.object({
    people: v.pipe(
      v.array(
        v.pipe(
          v.object({ name: v.string() }),
          actions.props.patchAsync({
            title: (field) => {
              return `Name for person ${field.keyPath![0]}`;
            },
          }),
          setComponent('fieldset')
        )
      ),
      setComponent('array-rw'),
      actions.inputs.patch({
        initItem: () => {
          return { name: '', age: 0 };
        },
      })
    ),

    __formHelper: v.pipe(NFCSchema, setComponent('formHelper')),
  }),
  setComponent('fieldset')
);
const options = {
  fieldGlobalConfig: fieldConfig,
  builder: CustomNgBuilder,
};
export function ArrayDemo() {
  function modelChange(event: any) {
    console.log(event);
  }
  const initValue = { people: [] };
  return (
    <>
      <PiyingView schema={schema} options={options} modelChange={modelChange} model={initValue}></PiyingView>
    </>
  );
}
