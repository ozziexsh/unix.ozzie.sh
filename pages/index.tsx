import Head from 'next/head';
import formatISO from 'date-fns/formatISO';
import { useState } from 'react';
import isValid from 'date-fns/isValid';

export default function Home() {
  const [unixInput, setUnixInput] = useState('');
  const [result, setResult] = useState('');

  function onUnixInputChange(e: React.FormEvent<HTMLInputElement>) {
    setUnixInput(e.currentTarget.value);
  }

  function onConvertPress() {
    const date = new Date(Number(unixInput) * 1000);
    if (!unixInput || !isValid(date)) {
      return;
    }
    setResult(formatISO(date));
  }

  return (
    <div className={'h-screen flex flex-col justify-center'}>
      <Head>
        <title>Unix Time Conversion | ozzie.sh</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={'px-4 w-full max-w-md mx-auto'}>
        <label htmlFor="" className={'block mb-2 text-lg'}>
          Enter a timestamp
        </label>
        <input
          type="text"
          className={
            'block w-full px-2 py-1 border border-gray-700 border-solid rounded-md'
          }
          value={unixInput}
          onChange={onUnixInputChange}
        />
        <button
          className={'mt-2 block w-full py-2 bg-black text-white rounded-md'}
          onClick={onConvertPress}
        >
          Convert
        </button>

        <p className={'mt-2 text-gray-700'}>{result}</p>
      </div>

      <style jsx>{``}</style>
    </div>
  );
}
