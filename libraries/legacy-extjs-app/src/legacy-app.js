// Assumes ExtJS `ext-all.js` has already been loaded in the page.

(function () {
  var appPanel = null;

  function mount(domId) {
    // Ensure Ext is ready
    if (typeof Ext === "undefined") {
      console.error("ExtJS is not loaded; cannot mount legacy app");
      return;
    }

    // If we already have a panel, destroy it before re-creating
    if (appPanel) {
      appPanel.destroy();
      appPanel = null;
    }

    Ext.onReady(function () {
      appPanel = Ext.create("Ext.panel.Panel", {
        renderTo: domId,
        title: "ExtJS Legacy Example",
        width: "100%",
        height: 380,
        layout: "fit",
        items: [
          {
            xtype: "grid",
            title: "Sample Portfolio Positions",
            columns: [
              { text: "Symbol", dataIndex: "symbol", flex: 1 },
              { text: "Quantity", dataIndex: "qty", width: 100 },
              { text: "Price", dataIndex: "price", width: 100 },
            ],
            store: {
              fields: ["symbol", "qty", "price"],
              data: [
                { symbol: "AAPL", qty: 100, price: 180.23 },
                { symbol: "MSFT", qty: 50, price: 415.10 },
                { symbol: "NVDA", qty: 25, price: 900.0 },
              ],
            },
          },
        ],
      });
    });
  }

  function unmount() {
    if (appPanel) {
      appPanel.destroy();
      appPanel = null;
    }
  }

  // Expose the API in a predictable namespace
  window.Legacy = {
    mount: mount,
    unmount: unmount,
  };
})();

