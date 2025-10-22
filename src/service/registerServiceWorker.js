export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // Use the publicPath for service worker registration
      // This assumes your webpack.config.js publicPath is set correctly
      const publicPath = process.env.NODE_ENV === 'production' ? '/wpa_tic_tac_toe/' : '/';
      navigator.serviceWorker.register(`${publicPath}sw.js`).then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }
}