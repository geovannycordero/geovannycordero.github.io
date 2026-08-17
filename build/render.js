const ESCAPE_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ESCAPE_MAP[char]);
}

// Tagged template for readability at call sites; does not auto-escape
// interpolations — callers pass pre-escaped/trusted markup, same trust
// boundary the JSX version had via dangerouslySetInnerHTML.
function html(strings, ...values) {
  return strings.reduce(
    (out, str, i) => out + str + (i < values.length ? values[i] : ''),
    ''
  );
}

module.exports = { escapeHtml, html };
