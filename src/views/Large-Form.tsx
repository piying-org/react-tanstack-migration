import * as v from 'valibot';
import { setComponent, NFCSchema, actions, asVirtualGroup } from '@piying/view-core';
import { fieldConfig } from '../piying/define';
import { CustomNgBuilder } from '../piying/custom.builder';
import { PiyingView } from '@piying/view-react';

const schema = v.pipe(
  v.intersect([
    v.pipe(
      v.object({
        fullName: v.pipe(
          v.string(),
          v.minLength(1),
          v.title('Full Name'),
          actions.wrappers.set(['label', 'validator']),
          actions.props.patch({ titlePosition: 'top' })
        ),
        email: v.pipe(
          v.optional(v.string()),
          v.title('Email'),
          actions.wrappers.set(['label', 'validator']),
          actions.props.patch({ titlePosition: 'top' })
        ),
        phone: v.pipe(
          v.string(),
          v.minLength(1),
          v.title('Phone'),
          actions.wrappers.set(['label', 'validator']),
          actions.props.patch({ titlePosition: 'top' })
        ),
      }),
      v.title('Personal Information'),
      setComponent('fieldset')
    ),
    v.object({
      address: v.pipe(
        v.object({
          line1: v.pipe(
            v.string(),
            v.title('Address Line 1'),
            actions.wrappers.set(['label', 'validator']),
            actions.props.patch({ titlePosition: 'top' })
          ),
          line2: v.pipe(
            v.string(),
            v.title('Address Line 2'),
            actions.wrappers.set(['label', 'validator']),
            actions.props.patch({ titlePosition: 'top' })
          ),
          city: v.pipe(
            v.string(),
            v.title('City'),
            actions.wrappers.set(['label', 'validator']),
            actions.props.patch({ titlePosition: 'top' })
          ),
          state: v.pipe(
            v.string(),
            v.title('State'),
            actions.wrappers.set(['label', 'validator']),
            actions.props.patch({ titlePosition: 'top' })
          ),
          zip: v.pipe(
            v.string(),
            v.title('ZIP Code'),
            actions.wrappers.set(['label', 'validator']),
            actions.props.patch({ titlePosition: 'top' })
          ),
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
            actions.wrappers.set(['label', 'validator']),
            actions.props.patch({ titlePosition: 'top' })
          ),
          phone: v.pipe(
            v.string(),
            v.minLength(1),
            v.title('Phone'),
            actions.wrappers.set(['label', 'validator']),
            actions.props.patch({ titlePosition: 'top' })
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
