export async function installApp() {
  const win = window as any;

  if (win.appDeferredPrompt) {
    let deferredPrompt = win.appDeferredPrompt;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        // Your PWA has been installed
      } else {
        // 'User chose to not install your PWA'
      }

      deferredPrompt = null;
    });
  }
}

export function canBeInstalled() {
  const win = window as any;

  if (win.appDeferredPrompt) {
    let isStandalone = false;
    if (window.matchMedia('(display-mode: standalone)').matches) {
      isStandalone = true;
    }

    const navigator: any = window.navigator;
    if (navigator.standalone === true) {
      isStandalone = true;
    }

    return !isStandalone;
  }

  return false;
}
