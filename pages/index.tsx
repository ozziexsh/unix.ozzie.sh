import Head from 'next/head';
import { useState } from 'react';
import moment, { Moment } from 'moment';

interface ResultProps {
  label: string;
  value: string;
}

function Result({ label, value }: ResultProps) {
  return (
    <div className={'mt-4'}>
      <p className="max-w-2xl text-sm leading-5 text-gray-600">{label}</p>
      <h3 className="mt-1 text-lg leading-6 font-medium text-gray-900">
        {value}
      </h3>
    </div>
  );
}

function setTz(date: Moment, isUtc: boolean) {
  if (isUtc) {
    return date.clone().utc();
  }
  return date.clone();
}

export default function Home() {
  const [unixInput, setUnixInput] = useState('');
  const [resultDate, setResultDate] = useState<Moment | null>(null);
  const [utc, setUtc] = useState(false);

  function onUnixInputChange(e: React.FormEvent<HTMLInputElement>) {
    setResultDate(null);
    setUnixInput(e.currentTarget.value);
  }

  function onConvertPress(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const date = moment.unix(+unixInput);
    if (!unixInput || !date.isValid()) {
      return;
    }
    setResultDate(date);
  }

  return (
    <div className={'h-screen flex flex-col justify-center'}>
      <Head>
        <title>Unix Time Conversion | ozzie.sh</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={'px-4 w-full max-w-md mx-auto'}>
        <form onSubmit={onConvertPress}>
          <label htmlFor="unix" className={'block mb-2 text-lg'}>
            Enter a timestamp
          </label>
          <input
            id="unix"
            type="text"
            className={
              'block w-full px-2 py-1 border border-gray-700 border-solid rounded-md'
            }
            value={unixInput}
            onChange={onUnixInputChange}
          />
          <button
            className={'mt-2 block w-full py-2 bg-black text-white rounded-md'}
            type={'submit'}
          >
            Convert
          </button>
        </form>

        {resultDate && (
          <div className={'mt-4'}>
            <hr className={'mb-4'} />
            <div className="flex flex-row space-x-4">
              <div className="flex items-center">
                <input
                  id="tz-utc"
                  type="radio"
                  name="local"
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  checked={utc === true}
                  onChange={() => setUtc(true)}
                  tabIndex={0}
                />
                <label htmlFor="tz-utc" className="ml-3">
                  <span className="block text-sm leading-5 font-medium text-gray-700">
                    UTC
                  </span>
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="tz-local"
                  name="local"
                  type="radio"
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  checked={utc === false}
                  onChange={() => setUtc(false)}
                  tabIndex={0}
                />
                <label htmlFor="tz-local" className="ml-3">
                  <span className="block text-sm leading-5 font-medium text-gray-700">
                    Local Timezone (UTC{moment().format('Z')})
                  </span>
                </label>
              </div>
            </div>
            <div className="space-y-4">
              <Result label={'ISO-8601'} value={resultDate.toISOString(!utc)} />
              <Result
                label={'Human Readable'}
                value={setTz(resultDate, utc).format(
                  'MMMM Do, YYYY - hh:mm:ss a',
                )}
              />
            </div>
          </div>
        )}
      </div>

      <style jsx>{``}</style>
    </div>
  );
}
