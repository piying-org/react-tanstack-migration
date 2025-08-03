import './App.css';
import { ArrayDemo } from './views/Array';
import { FieldErrorsFromFormValidators } from './views/Field-Errors-From-Form-Validators';
import { LargeForm } from './views/Large-Form';
import { QueryIntegration } from './views/Query-Integration';
import { Simple } from './views/Simple';
import { StandardSchema } from './views/Standard-Schema';
import { UiLibraries } from './views/Ui-Libraries';
const List = [
  {
    label: 'Simple',
    from: 'https://tanstack.com/form/latest/docs/framework/react/examples/simple',
    to: '/views/Simple',
    Component: Simple,
  },
  {
    label: 'Array',
    from: 'https://tanstack.com/form/latest/docs/framework/react/examples/array',
    to: '/views/Array',
    Component: ArrayDemo,
  },
  {
    label: 'Large Form',
    from: 'https://tanstack.com/form/latest/docs/framework/react/examples/large-form',
    to: '/views/Large-Form',
    Component: LargeForm,
  },
  {
    label: 'Query Integration',
    from: 'https://tanstack.com/form/latest/docs/framework/react/examples/query-integration',
    to: '/views/Query-Integration',
    Component: QueryIntegration,
  },
  {
    label: 'Standard Schema',
    from: 'https://tanstack.com/form/latest/docs/framework/react/examples/standard-schema',
    to: '/views/Standard-Schema',
    Component: StandardSchema,
  },
  {
    label: 'Ui Libraries',
    from: 'https://tanstack.com/form/latest/docs/framework/react/examples/ui-libraries',
    to: '/views/Ui-Libraries',
    Component: UiLibraries,
  },
  {
    label: 'Field Errors From Form Validators',
    from: 'https://tanstack.com/form/latest/docs/framework/react/examples/field-errors-from-form-validators',
    to: '/views/Field-Errors-From-Form-Validators',
    Component: FieldErrorsFromFormValidators,
  },
];
function App() {
  return (
    <>
      <div className="flex flex-col gap-4">
        {List.map((item, index) => {
          return (
            <div key={index}>
              <div className="flex gap-4 *:flex-1 items-center *:first:flex-0">
                <label className="label">{item.label}</label>
                <a href={item.from} className="link-primary btn" target="_blank">
                  Tanstack Page
                </a>
                <a
                  href={'https://github.com/piying-org/react-hook-form-migration/tree/main/src' + item.to + '.tsx'}
                  className="link-secondary btn"
                  target="_blank"
                >
                  Piying Code
                </a>
              </div>
              <item.Component key={index}></item.Component>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
