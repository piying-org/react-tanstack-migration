import * as v from 'valibot';
import {
  setComponent,
  NFCSchema,
  setWrappers,
  patchProps,
  asVirtualGroup,
} from '@piying/view-core';
import { fieldConfig } from '../piying/define';
import { CustomNgBuilder } from '../piying/custom.builder';
import { PiyingView } from '@piying/view-react';
function LabelCommon<T>() {
  return [setWrappers(['label', 'validator']), patchProps({ titlePosition: 'top' })] as const;
}

const schema = v.pipe(
  v.intersect([
    v.pipe(
      v.object({
        fullName: v.pipe(
          v.string(),
          v.minLength(1),
          v.title('Full Name'),
          setWrappers(['label', 'validator']),
          patchProps({ titlePosition: 'top' })
        ),
        email: v.pipe(v.optional(v.string()), v.title('Email'), setWrappers(['label', 'validator']), patchProps({ titlePosition: 'top' })),
        phone: v.pipe(
          v.string(),
          v.minLength(1),
          v.title('Phone'),
          setWrappers(['label', 'validator']),
          patchProps({ titlePosition: 'top' })
        ),
      }),
      v.title('Personal Information'),
      setComponent('fieldset')
    ),
    v.object({
      address: v.pipe(
        v.object({
          line1: v.pipe(v.string(), v.title('Address Line 1'), setWrappers(['label', 'validator']), patchProps({ titlePosition: 'top' })),
          line2: v.pipe(v.string(), v.title('Address Line 2'), setWrappers(['label', 'validator']), patchProps({ titlePosition: 'top' })),
          city: v.pipe(v.string(), v.title('City'), setWrappers(['label', 'validator']), patchProps({ titlePosition: 'top' })),
          state: v.pipe(v.string(), v.title('State'), setWrappers(['label', 'validator']), patchProps({ titlePosition: 'top' })),
          zip: v.pipe(v.string(), v.title('ZIP Code'), setWrappers(['label', 'validator']), patchProps({ titlePosition: 'top' })),
        }),
        v.title('Address'),
        setComponent('fieldset')
      ),
      emergencyContact: v.pipe(
        v.object({
          fullName: v.pipe(
            v.string(),
            v.minLength(1),
            v.title('Full Name'),
            setWrappers(['label', 'validator']),
            patchProps({ titlePosition: 'top' })
          ),
          phone: v.pipe(
            v.string(),
            v.minLength(1),
            v.title('Phone'),
            setWrappers(['label', 'validator']),
            patchProps({ titlePosition: 'top' })
          ),
        }),
        setComponent('fieldset'),
        v.title('Emergency Contact')
      ),
    }),
    v.object({
      __formHelper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
  ]),
  asVirtualGroup(),
  setComponent('fieldset')
);
const options = {
  fieldGlobalConfig: fieldConfig,
  builder: CustomNgBuilder,
};
export function LargeForm() {
  function modelChange(event: any) {
    console.log(event);
  }
  const initValue = {
    fullName: '',
    email: '',
    phone: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: '',
    },
    emergencyContact: {
      fullName: '',
      phone: '',
    },
  };
  return (
    <>
      <PiyingView schema={schema} options={options} modelChange={modelChange} model={initValue}></PiyingView>
    </>
  );
}
