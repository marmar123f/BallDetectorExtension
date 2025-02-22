chrome.runtime.onInstalled.addListener(() => {
    console.log("إضافة Ball Detector تم تثبيتها بنجاح!");
});

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"]
    });
});
