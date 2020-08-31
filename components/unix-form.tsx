interface Props {
  value: string;
  onChange(value: string): void;
}

export default function UnixForm({ onChange, value }: Props) {
  return (
    <div>
      <label htmlFor="unix" className={'block mb-2 text-lg'}>
        Enter a timestamp
      </label>
      <input
        id="unix"
        type="text"
        className={
          'block w-full px-2 py-1 border border-gray-700 border-solid rounded-md'
        }
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
}
