import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: document.getElementById('name').value, 
                                email: document.getElementById('email').value, 
                                message: document.getElementById('message').value }),
      });

      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="popOutContainer relative grid grid-cols-2 col-span-full row-span-4 justify-between p-10 gap-5">
      <div className={`contents ${status === 'success' || status === 'error' ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'} transition-opacity duration-300`}>
        <h1 className="col-span-full text-3xl font-bold text-center">Let's get in touch!</h1>
        <div className="flex flex-col gap-2">
            <label htmlFor="name" className="markRequired text-xl font-semibold">Name</label>
            <input required id="name" name="name" type="text" placeholder="What should I call you?" className="rounded-lg p-3 border-2 border-gray-300 outline-none focus:border-transparent focus:ring-3 ring-(--accent-light) transition" />                
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="email" className="markRequired text-xl font-semibold">Email</label>
            <input required id="email" name="email" type="email" placeholder="What's your email?" className="rounded-lg p-3 border-2 border-gray-300 outline-none focus:border-transparent focus:ring-3 ring-(--accent-light) transition" />
        </div>
        <div className="flex flex-col gap-2 col-span-full">
            <label htmlFor="message" className="markRequired text-xl font-semibold">Message</label>
            <textarea required id="message" name="message" placeholder="Write me a message!" rows="4" className="resize-none rounded-lg p-3 border-2 border-gray-300 outline-none focus:border-transparent focus:ring-3 ring-(--accent-light) transition"></textarea>
        </div>

        <button type="submit" disabled={status === 'loading'} className="col-span-full p-3 rounded-lg bg-(--primary-light) text-white font-bold cursor-pointer hover:bg-(--primary-light-muted) transition">
            {status === 'loading' ? 'Sending…' : 'Send Message'}
        </button>
      </div>

      {(status === 'success' || status === 'error') && (
        <div className="absolute inset-0 flex items-center justify-center font-semibold text-center text-xl">
          {status === 'success' && (
            <p>
              Thanks! I'll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <div className="flex flex-col gap-5">
              <p>
                Something went wrong. Please try again.
              </p>
              <button type="button" onClick={() => setStatus('idle')} className="col-span-full p-3 rounded-lg bg-(--primary-light) text-white font-bold cursor-pointer hover:bg-(--primary-light-muted) transition">
                  Retry
              </button>
            </div>
          )}
        </div>
      )}
    </form>
  );
}