chrome.runtime.onInstalled.addListener((details) => {
  chrome.contextMenus.create({
    title: "Search TV Shows",
    id: "contextMenu1",
    contexts: ["page", "selection"]
  })
  chrome.contextMenus.create({
    title: "Read this text",
    id: "contextMenu2",
    contexts: ["page", "selection"]
  })
  chrome.contextMenus.onClicked.addListener((event) => {
    if(event.menuItemId === "contextMenu1") {
      fetch(`https://api.tvmaze.com/search/shows?q=${event.selectionText}`)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          chrome.storage.local.set({
            shows: data
          })
        })
    }else if(event.menuItemId === "contextMenu2") {
      chrome.tts.speak(event.selectionText)
    }
  })
})

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log(msg)
  console.log(sender)
  sendResponse("Background filedan oldim")
  chrome.tabs.sendMessage(sender.tab.id, "Got your message from bg")
})