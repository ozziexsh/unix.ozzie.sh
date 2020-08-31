interface ResultProps {
  label: string;
  value: string;
}

export default function Result({ label, value }: ResultProps) {
  return (
    <div className={'mt-4'}>
      <p className="max-w-2xl text-sm leading-5 text-gray-600">{label}</p>
      <h3 className="mt-1 text-lg leading-6 font-medium text-gray-900">
        {value}
      </h3>
    </div>
  );
}
