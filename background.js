chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (
        changeInfo.status === "complete" &&
        (tab.url.includes("experiments.php?mode=") || tab.url.includes("database.php?mode="))
    ) {
        // Inject content.js only if the URL includes "experiments.php?mode=" or "database.php?mode="
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["content.js"],
        });
    }
});

