var urlFilter = {
	url: [{ hostEquals: "admin.enf.me" }],
};

chrome.webNavigation.onDOMContentLoaded.addListener(function (tab) {
	var tabId = tab.tabId;
	var url = tab.url;

	if (url.includes("admin.enf.me/solar/ID/edit")) {
		chrome.scripting.executeScript({
			target: { tabId: tabId },
			files: ["src/company/company.js"],
		});
		chrome.scripting.insertCSS({
			target: { tabId: tabId },
			files: ["src/company/company.css"],
		});
	} else if (url.includes("admin.enf.me/solar/ID/classification")) {
        // classification page
	} 
}, urlFilter);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.type === "strings") {
        let [website, companyName, mode] = request.data;

        // strict => adds " " around the search query
        switch(mode) {
            case "normal" :
                break;
            case "strict":
                companyName = `"${companyName}"`;
        }

        // Prepare the URL
        const encodedSearchInfo = encodeURIComponent(companyName);

        chrome.tabs.create({ url: `https://www.google.com/search?q=site:${website} ${encodedSearchInfo}`});
	}
});