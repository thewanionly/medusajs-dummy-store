if (process.env.NODE_ENV === 'development') {
  import('./mocks/msw/browser')
    .then(async (mod) => {
      if (mod?.worker?.start) {
        mod.worker.start({ onUnhandledRequest: 'bypass' });
      }
    })
    .catch(async () => {
      console.error('Failed to load the browser module');
    });
}
