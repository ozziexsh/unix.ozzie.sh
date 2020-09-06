import { InputHTMLAttributes, ChangeEvent } from 'react';

export interface DateFormProp {
  year: string;
  month: string;
  day: string;
  hours: string;
  minutes: string;
  seconds: string;
}

function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="text"
      className={'px-2 py-1 border border-gray-700 border-solid rounded-md'}
      style={{ minWidth: 0 }}
      {...props}
    />
  );
}

interface Props {
  value: DateFormProp;
  onChange(form: DateFormProp): void;
}

export default function DateForm({ value, onChange }: Props) {
  function updateInput(
    name: keyof DateFormProp,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    onChange({
      ...value,
      [name]: event.currentTarget.value,
    });
  }

  return (
    <div>
      <label htmlFor="unix" className={'block mb-2 text-lg'}>
        Enter a date (24h)
      </label>
      <div className="flex flex-row items-center space-x-1">
        <Input
          placeholder={'YYYY'}
          maxLength={4}
          value={value.year}
          onChange={(e) => updateInput('year', e)}
        />
        <span>-</span>
        <Input
          placeholder={'MM'}
          maxLength={2}
          value={value.month}
          onChange={(e) => updateInput('month', e)}
        />
        <span>-</span>
        <Input
          placeholder={'DD'}
          maxLength={2}
          value={value.day}
          onChange={(e) => updateInput('day', e)}
        />
        <Input
          placeholder={'HH'}
          maxLength={2}
          value={value.hours}
          onChange={(e) => updateInput('hours', e)}
        />
        <span>:</span>
        <Input
          placeholder={'mm'}
          maxLength={2}
          value={value.minutes}
          onChange={(e) => updateInput('minutes', e)}
        />
        <span>:</span>
        <Input
          placeholder={'ss'}
          maxLength={2}
          value={value.seconds}
          onChange={(e) => updateInput('seconds', e)}
        />
      </div>
    </div>
  );
}
