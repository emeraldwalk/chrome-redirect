async function main() {
  const config = await fetch(chrome.extension.getURL('public/config.json'))
    .then(response => response.json());

  console.log('Chrome redirect config:', JSON.stringify(config, undefined, 2));

  chrome.webRequest.onBeforeRequest.addListener(
    details => {
      if(config.redirects[details.url]) {
        return {
          redirectUrl: chrome.extension.getURL(config.redirects[details.url])
        };
      }
    },
    { urls: config.scope },
    ['blocking']
  );
}

main();