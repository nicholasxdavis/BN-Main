/**
 * Blacnova CMS bridge — loads published content + maintenance from the API
 * and applies it to elements marked with data-bn-content="<block-id>".
 */
;(function () {
  const API = 'https://blacnova-api.nic-58f.workers.dev'
  const DOMAIN = 'www.blacnova.net'

  function applyContent(blocks) {
    if (!Array.isArray(blocks)) return
    blocks.forEach(function (block) {
      const nodes = document.querySelectorAll('[data-bn-content="' + block.id + '"]')
      nodes.forEach(function (el) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.value = block.value
        } else if (el.tagName === 'IMG') {
          el.setAttribute('alt', block.value)
        } else {
          el.textContent = block.value
        }
      })
    })
  }

  function showMaintenance(maintenance) {
    if (!maintenance || !maintenance.enabled) return
    var existing = document.getElementById('bn-maintenance-overlay')
    if (existing) return

    var overlay = document.createElement('div')
    overlay.id = 'bn-maintenance-overlay'
    overlay.setAttribute(
      'style',
      'position:fixed;inset:0;z-index:99999;background:#0a0a0a;color:#fff;display:flex;align-items:center;justify-content:center;padding:24px;font-family:Poppins,sans-serif;text-align:center;',
    )
    overlay.innerHTML =
      '<div style="max-width:480px">' +
      '<div style="width:48px;height:48px;border-radius:12px;background:#d4611c;margin:0 auto 20px"></div>' +
      '<h1 style="font-size:28px;font-weight:500;margin:0 0 12px">' +
      escapeHtml(maintenance.title || "We'll be right back") +
      '</h1>' +
      '<p style="color:#9ca3af;line-height:1.6;margin:0 0 16px">' +
      escapeHtml(maintenance.message || '') +
      '</p>' +
      (maintenance.expectedReturn
        ? '<p style="color:#d4611c;font-size:14px;margin:0">Expected return: ' +
          escapeHtml(maintenance.expectedReturn) +
          '</p>'
        : '') +
      '</div>'
    document.body.appendChild(overlay)
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }

  async function load() {
    try {
      var res = await fetch(API + '/v1/public/' + encodeURIComponent(DOMAIN) + '/site')
      if (!res.ok) return
      var data = await res.json()
      showMaintenance(data.maintenance)
      applyContent(data.content)
    } catch (err) {
      console.warn('[bn-cms] failed to load content', err)
    }
  }

  window.BlacnovaCMS = {
    api: API,
    domain: DOMAIN,
    submit: async function (payload) {
      var res = await fetch(API + '/v1/public/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.assign({ domain: DOMAIN }, payload)),
      })
      if (!res.ok) {
        var err = await res.json().catch(function () {
          return { error: 'Submission failed' }
        })
        throw new Error(err.error || 'Submission failed')
      }
      return res.json()
    },
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load)
  } else {
    load()
  }
})()
