import { PI_VIEW_FIELD_TOKEN, useSignalToRef } from '@piying/view-react';
import { useContext } from 'react';

export function Button(props: { label: string }) {
  const field = useContext(PI_VIEW_FIELD_TOKEN)!;
  const attributes = useSignalToRef(field, (field) => field.attributes());  
  return (
    <button className="btn" {...attributes}>
      {props.label}
    </button>
  );
}
