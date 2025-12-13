import fs from 'node:fs'
import path from 'node:path'
import beautifyPkg from 'js-beautify'

const beautifyHtml = beautifyPkg.html

const options = {
  indent_size: 2,
  indent_char: ' ',
  max_preserve_newlines: 1,
  preserve_newlines: true,
  indent_inner_html: true,
  brace_style: 'collapse',
  indent_scripts: 'normal',
  wrap_line_length: 0,
  wrap_attributes: 'force-aligned',
  extra_liners: [
    'head',
    'body',
    '/html',
    'header',
    'nav',
    'main',
    'footer',
    'section',
    'article',
  ],
}

const distPath = './dist'

function procesarDirectorio(directorio) {
  const archivos = fs.readdirSync(directorio, { withFileTypes: true })

  for (const archivo of archivos) {
    const rutaCompleta = path.join(directorio, archivo.name)

    if (archivo.isDirectory()) {
      procesarDirectorio(rutaCompleta)
    } else if (archivo.name.endsWith('.html')) {
      console.log(`✨ Limpiando: ${rutaCompleta}`)
      const contenido = fs.readFileSync(rutaCompleta, 'utf8')

      // Usamos la función que extrajimos arriba
      const htmlLimpio = beautifyHtml(contenido, options)

      fs.writeFileSync(rutaCompleta, htmlLimpio, 'utf8')
    }
  }
}

console.log('🧹 Iniciando limpieza de HTML...')
if (fs.existsSync(distPath)) {
  procesarDirectorio(distPath)
  console.log('✅ HTML limpio y ordenado.')
} else {
  console.error('❌ No encuentro la carpeta dist/ ¿Has hecho build?')
  process.exit(1)
}
