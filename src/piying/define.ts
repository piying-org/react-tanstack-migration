import { PiyingGroup, type PiViewConfig } from '@piying/view-react';
import { FieldsetGroup } from './group/fieldset';
import { InputCheckbox } from './input-checkbox';
import { InputNumber } from './input-number';
import { InputRadio } from './input-radio';
import { InputText } from './input-text';
import { LabelWrapper } from './wrapper/label-wrapper';
import { ValidatorWrapper } from './wrapper/validator-wrapper';
import { ArrayRwGroup } from './group/array-rw';
import { MultiCheckbox } from './multi-checkbox';
import { FormHelp } from './form-help';
import { Button } from './button';
import { lazy } from 'react';
import { MantineWrapper } from './wrapper/mantine-wrapper';

export const fieldConfig = {
  types: {
    string: { type: InputText, wrappers: ['label'] },
    number: { type: InputNumber, wrappers: ['label'] },
    radio: { type: InputRadio },
    boolean: { type: InputCheckbox, wrappers: ['label'] },
    fieldset: { type: FieldsetGroup },
    'multi-checkbox': { type: MultiCheckbox },
    'array-rw': { type: ArrayRwGroup },
    formHelper: { type: FormHelp },
    object: { type: PiyingGroup },
    button: { type: Button },
    'mui-input': { type: lazy(() => import('./mui/input-text').then(({ MuiTextField }) => ({ default: MuiTextField }))) },
    'mui-checkbox': { type: lazy(() => import('./mui/checkbox').then(({ MuiCheckbox }) => ({ default: MuiCheckbox }))) },
    'mantine-input': { type: lazy(() => import('./mantine/input-text').then(({ MantineTextField }) => ({ default: MantineTextField }))) },
    'mantine-checkbox': { type: lazy(() => import('./mantine/checkbox').then(({ MantineCheckbox }) => ({ default: MantineCheckbox }))) },
  },
  wrappers: {
    label: {
      type: LabelWrapper,
    },
    validator: {
      type: ValidatorWrapper,
    },
    mantine: {
      type: MantineWrapper,
    },
  },
} as PiViewConfig;
