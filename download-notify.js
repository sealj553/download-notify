var downloads = {};

browser.downloads.onCreated.addListener(function reportDownload(item) {
    browser.notifications.create({
        "type": "basic",
        "iconUrl": browser.extension.getURL("icons/icon-48.png"),
        "title": "Download Started",
        "message": item.filename
    });

    downloads[item.id] = item.filename;
});

browser.downloads.onChanged.addListener(function reportDownloadEnd(item) {
    if (item.state.current == "complete") {
        browser.notifications.create({
            "type": "basic",
            "iconUrl": browser.extension.getURL("icons/icon-48.png"),
            "title": "Download Completed",
            "message": downloads[item.id]
        });
        delete downloads[item.id];
    }
});
