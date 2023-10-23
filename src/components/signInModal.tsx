import { signIn } from 'next-auth/react';
import Link from 'next/link';

const SignInModal = () => {
  return (
    <dialog id='signInModal' className='modal'>
      <div className='modal-box w-1/4 '>
        <h3 className='text-lg font-bold'>Sign In!</h3>
        <div className='modal-action flex-col justify-normal'>
          <form method='dialog'>
            <button
              className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'
              onClick={() =>
                (
                  document.getElementById('signInModal') as HTMLDialogElement
                ).close()
              }
            >
              ✕
            </button>
            <div className='mb-3 flex w-full flex-col'>
              {/* name */}
              <div className='w-full'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  //   required
                  name='email'
                  type='email'
                  autoComplete='true'
                  className='peer input input-bordered mb-3 w-full'
                />
              </div>

              {/* password */}
              <div className='w-full'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input
                  //   required
                  type='password'
                  name='password'
                  autoComplete='true'
                  className='peer input input-bordered mb-3 w-full'
                />
              </div>
            </div>
            <div className='flex flex-col gap-5'>
              <button className='btn btn-primary' onClick={() => signIn()}>
                Sign In
              </button>
            </div>
          </form>
          <Link href='auth/signup'>Don&apos;t have an account yet?</Link>
        </div>
      </div>
    </dialog>
  );
};

export default SignInModal;
