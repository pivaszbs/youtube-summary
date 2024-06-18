export const waitFor = (timeout = 10000, selector: string) => new Promise<Element>((resolve, reject) => {
    if (timeout === 0) {
      reject();
    }
    const timeoutId = setTimeout(() => {
      const element = document.querySelector(selector);
      if (!element) {
        waitFor(timeout - 100, selector);
      } else {
        clearTimeout(timeoutId);
        resolve(element);
      }
    }, 100);
  })

export const wait = (ms = 10000) => new Promise(resolve => setTimeout(resolve, ms));