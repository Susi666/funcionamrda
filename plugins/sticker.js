const { MessageType } = require('@adiwajshing/baileys')
const { sticker } = require('../lib/sticker')
let handler  = async (m, { conn, args }) => {
  let stiker = false
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/image|video/.test(mime)) {
      let img = await q.download()
      if (!img) throw 'Foto/Video tidak ditemukan'
      stiker = await sticker(img, false, global.packname, global.author)
    } else if (args[0]) stiker = await sticker(false, args[0], global.packname, global.author)
  } finally {
    if (stiker) conn.sendMessage(m.chat, stiker, MessageType.sticker, {
      quoted: m
    })
    else throw 'Conversion failed'
  }
}
handler.help = ['stiker ᴹᵃⁿᵈᵃ ˡᵃ ᶦᵐᵃᵍᵉⁿ ᵒ ᵉˡ ᵛᶦᵈᵉᵒ', 'stiker ᴹᵃⁿᵈᵃ ˡᵃ ᶦᵐᵃᵍᵉⁿ ᵒ ᵉˡ ᵛᶦᵈᵉᵒ', 'stikergif ᴹᵃⁿᵈᵃ ˡᵃ ᶦᵐᵃᵍᵉⁿ ᵒ ᵉˡ ᵛᶦᵈᵉᵒ', 'stikergif ᴱˢᶜʳᶦᵇᵉ ˡᵃ ᵘʳˡ']
handler.tags = ['sticker']
handler.command = /^s(tic?ker)?(gif)?(wm)?$/i

module.exports = handler
