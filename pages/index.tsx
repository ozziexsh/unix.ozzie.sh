import Head from 'next/head';
import { useState, FormEvent } from 'react';
import UnixForm from '../components/unix-form';
import DateForm, { DateFormProp } from '../components/date-form';
import ArrowRightIcon from '../icons/arrow-right-icon';
import ArrowLeftIcon from '../icons/arrow-left-icon';
import Result from '../components/result';
import moment, { Moment } from 'moment';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';

enum Mode {
  Unix = 'unix',
  Date = 'date',
}

const DEFAULT_DATE_FORM = {
  year: moment().format('YYYY'),
  month: moment().format('MM'),
  day: moment().format('DD'),
  hours: moment().format('HH'),
  minutes: moment().format('mm'),
  seconds: moment().format('ss'),
};

function setDefaultMode(queryObj: any) {
  if (queryObj.mode && [Mode.Unix, Mode.Date].includes(queryObj.mode)) {
    return queryObj.mode;
  }
  return Mode.Unix;
}

export default function Home(props: { mode: Mode }) {
  const router = useRouter();
  const [mode, setMode] = useState(props.mode);
  const [resultDate, setResultDate] = useState<Moment | null>(null);
  const [utc, setUtc] = useState(false);
  const [resultUtc, setResultUtc] = useState(false);
  const [unixInput, setUnixInput] = useState('');
  const [form, setForm] = useState<DateFormProp>(DEFAULT_DATE_FORM);

  function onModeSwap(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    const newMode = mode === Mode.Unix ? Mode.Date : Mode.Unix;
    setMode(newMode);
    setResultDate(null);
    setForm({ ...DEFAULT_DATE_FORM });
    setUnixInput('');
    router.replace('/', { query: { mode: newMode } });
  }

  function onUnixInputChange(value: string) {
    setUnixInput(value);
  }

  function onConvertUnix(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const date = moment.unix(+unixInput);
    if (utc) {
      date.utc();
    }
    if (!unixInput || !date.isValid()) {
      return;
    }
    setResultUtc(utc);
    setResultDate(date);
  }

  function onConvertDate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let validForm = {
      year: form.year || DEFAULT_DATE_FORM.year,
      month: form.month || DEFAULT_DATE_FORM.month,
      day: form.day || DEFAULT_DATE_FORM.day,
      hours: form.hours || '00',
      minutes: form.minutes || '00',
      seconds: form.seconds || '00',
    };
    setForm(validForm);
    const date = (utc ? moment.utc : moment)(
      `${validForm.year}-${validForm.month}-${validForm.day} ${validForm.hours}:${validForm.minutes}:${validForm.seconds}`,
      'YYYY-MM-DD HH:mm:ss',
    );
    if (!date.isValid()) {
      return;
    }
    setResultUtc(utc);
    setResultDate(date);
  }

  return (
    <div className={'h-screen flex flex-col justify-between'}>
      <Head>
        <title>Unix Time Conversion | ozzie.sh</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div />

      <div className={'px-4 w-full max-w-md mx-auto'}>
        <div
          className={
            'flex flex-row justify-center items-center text-center space-x-4 text-4xl mb-8'
          }
        >
          <h2>{mode === Mode.Unix ? 'Unix' : 'Date'}</h2>
          <button
            className={'w-8 h-8 flex flex-col text-pink-500'}
            onClick={onModeSwap}
          >
            <ArrowRightIcon className={'w-8 h-8'} />
            <ArrowLeftIcon className={'w-8 h-8'} />
          </button>
          <h2 className={'text-gray-600'}>
            {mode === Mode.Unix ? 'Date' : 'Unix'}
          </h2>
        </div>
        <form onSubmit={mode === Mode.Unix ? onConvertUnix : onConvertDate}>
          {mode === Mode.Unix ? (
            <UnixForm value={unixInput} onChange={onUnixInputChange} />
          ) : (
            <DateForm value={form} onChange={setForm} />
          )}
          <div className="flex flex-row space-x-4 mt-4">
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
          <button
            className={'mt-4 block w-full py-2 bg-black text-white rounded-md'}
            type={'submit'}
          >
            Convert
          </button>
        </form>

        {resultDate && (
          <div className={'mt-4'}>
            <hr className={'mb-4'} />
            <div className="space-y-4">
              <Result label={'Unix'} value={`${resultDate.unix()}`} />
              <Result
                label={'ISO-8601'}
                value={resultDate.toISOString(!resultUtc)}
              />
              <Result
                label={'Human Readable'}
                value={resultDate.format('MMMM Do, YYYY - hh:mm:ss a')}
              />
            </div>
          </div>
        )}
      </div>

      <div className={'text-center py-2'}>
        <p className={'text-xs'}>
          <a href="https://ozzie.sh">Made with ♥ by oz</a>
        </p>
      </div>
    </div>
  );
}

Home.getInitialProps = (ctx: NextPageContext) => {
  return {
    mode: setDefaultMode(ctx.query),
  };
};
