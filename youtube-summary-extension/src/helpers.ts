export const waitFor = (timeout = 10000, selector: string) => new Promise<Element>((resolve, reject) => {
    if (timeout === 0) {
      reject();
    }

    const createTimeout = (timeout: number) => {
        setTimeout(() => {
            const element = document.querySelector(selector);
            if (!element) {
                createTimeout(timeout - 100);
            } else {;
                resolve(element);
            }
        }, 100);
    }

    createTimeout(timeout);
  })

export const wait = (ms = 10000) => new Promise(resolve => setTimeout(resolve, ms));