const SignUpModal = () => {

  const handleSignUp = async (
    // e: React.FormEvent<HTMLFormElement>,
    formData: FormData
  ) => {
    // e.preventDefault();
    console.log('CLICKED');

    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    console.log(email, password);
    const response = await fetch('/api/account', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    console.log('data', data.message);
    if (data.status === 200) {
      if (data.error) {
        alert(data.error);
      } else {
        (document.getElementById('signUpModal') as HTMLDialogElement).close();
        //remove alert
        alert('Account created successfully!');
      }
    } else {
      //remove alert
      //   alert(data.message);
    }
  };

  return (
    <dialog id='signUpModal' className='modal'>
      <div className='modal-box w-1/4 '>
        <h3 className='text-lg font-bold'>Sign Up!</h3>
        <div className='modal-action flex-col justify-normal'>
          <form action={handleSignUp}>
            <button
              className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'
              onClick={() =>
                (
                  document.getElementById('signUpModal') as HTMLDialogElement
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
                  // required
                  name='email'
                  type='email'
                  autoComplete="true"
                  className='peer input input-bordered mb-3 w-full'
                />
              </div>

              {/* password */}
              <div className='w-full'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input
                  // required
                  type='password'
                  name='password'
                  autoComplete="true"
                  className='peer input input-bordered mb-3 w-full'
                />
              </div>
            </div>
            <div className='flex flex-col gap-5'></div>{' '}
            <button className='btn btn-primary mb-3 w-full' type='submit'>
              Register
            </button>
          </form>

          <button
            className='mb-3'
            onClick={() =>
              (
                document.getElementById('signInModal') as HTMLDialogElement
              ).showModal()
            }
          >
            <span className='text-center'>Already have an account?</span>
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default SignUpModal;
