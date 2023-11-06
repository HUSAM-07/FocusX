const blockedWebsites = [
  'https://developer.chrome.com/docs/extensions',
  'https://developer.chrome.com/docs/webstore',
  'https://developer.mozilla.org',
  'https://www.w3schools.com',
  'https://stackoverflow.com',
  'https://github.com/',
  'https://www.youtube.com/',
  'https://www.google.com/',
  // Add more websites here as needed
];

chrome.action.onClicked.addListener(async (tab) => {
  if (blockedWebsites.some((url) => tab.url.startsWith(url))) {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === 'ON' ? 'OFF' : 'ON'

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });
    if (nextState === "ON") {
        // Insert the CSS file when the user turns the extension on
        await chrome.scripting.insertCSS({
          files: ["focus-mode.css"],
          target: { tabId: tab.id },
        });
      } else if (nextState === "OFF") {
        // Remove the CSS file when the user turns the extension off
        await chrome.scripting.removeCSS({
          files: ["focus-mode.css"],
          target: { tabId: tab.id },
        });
      }
    }
  });