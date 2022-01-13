const content = []
const hrefTags = document.getElementsByTagName("a");
for(const tag of hrefTags) {
  content.push(tag.textContent)
}
chrome.storage.local.set({content})

chrome.runtime.sendMessage(null, content, (response) => {
  console.log("Res func" + response)
});