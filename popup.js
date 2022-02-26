const wf_settings_btn = document.getElementById('wf_settings_btn')
// fetch wf_globals
chrome.storage.local.get("wf_globals", data => {
  if (data.wf_globals) {
    const globals = JSON.parse(data.wf_globals)
    if (!globals.status || !globals.exchange) return

    document.getElementById('wf_status').value = globals.status
    document.getElementById('wf_exchange').value = globals.exchange
  }
})

// set wf_globals
wf_settings_btn.addEventListener('click', () => {
  const status = document.getElementById('wf_status').value
  const exchange = document.getElementById('wf_exchange').value

  chrome.storage.local.set({"wf_globals": JSON.stringify({status, exchange})}, () => {
    const success_text = document.getElementById('wf_success_text')
    success_text.classList.add('block')
    setTimeout(() => {
      success_text.classList.remove('block')
    }, 3000)
  })
})
