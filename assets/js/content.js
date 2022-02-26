let wf_status = 'all'
let wf_exchange = 'all'

window.onload = function () {
  if ($('#with-copy-trader-role-holder')) addFeatures()
  else console.log("Its probably not the Copy Trading page.")
}

function addFeatures() {
  appendFilters()
  syncGlobalSettings()
  filterResults()
  $('#filterButton').on('click', filterResults)
}

function appendFilters() {
  const navTabs = $('#with-copy-trader-role-holder .nav.nav-tabs')

  if (!$('#WUNDERBIT_FILTERS').length) {
    navTabs.after(`<div class="nav nav-tabs custom-nav-tab pr-2">
    <form class="no-padding d-flex justify-content-between w-100">
    <div id="wf_status" class="d-flex align-items-center form-group mb-2">
      <div class="mr-2">Status</div>
      <div class="main-box_select"><select class="form-control wf_status">
        <option value="all">All</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select></div>
    </div>
    <div id="wf_exchange" class="d-flex align-items-center form-group mb-2">
      <div class="mr-2">Exchange</div>
      <div class="main-box_select"><select class="form-control wf_exchange">
        <option value="all">All</option>
        <optgroup label="Binance">
          <option value="BINANCE">Binance</option>
          <option value="BINANCE-FUTURES (USDT-M)">BINANCE-FUTURES (USDT-M)</option>
          <option value="BINANCE-FUTURES (COIN-M)">BINANCE-FUTURES (COIN-M)</option>
        </optgroup>
        <option value="KRAKEN">KRAKEN</option>
        <option value="FTX">FTX</option>
        <option value="BYBIT">BYBIT</option>
        <option value="DERIBIT">DERIBIT</option>
        <option value="KUCOIN">KUCOIN</option>
        <option value="OKEX">OKEX</option>
        <option value="BITMEX">BITMEX</option>
      </select></div>
    </div>
    <button type="button" class="btn btn-outline-success" id="filterButton">Filter</button>
    </form>
    </div>`);
  }
}

function syncGlobalSettings() {
  chrome.storage.local.get("wf_globals", data => {
    const { status, exchange } = JSON.parse(data.wf_globals)
    wf_status = status
    wf_exchange = exchange
    $(`.wf_status option[value=${wf_status}]`).attr('selected','selected');
    $(`.wf_exchange option[value=${wf_exchange}]`).attr('selected','selected');
  })
}

function filterResults() {
  // filter traders
  // filter bots
  $('.row.followed-bots-holder .table tbody > tr.item.clickable').each(function () {
    $(this).has("td.js_soc_td_status span p:contains('Inactive')").addClass('hidden')
  })
}
