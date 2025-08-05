import { defineEventHandler } from 'h3'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(() => {
  const filePath = resolve(process.cwd(), '.data/docks.json')

  if (!existsSync(filePath)) {
    return []
  }

  return JSON.parse(readFileSync(filePath, 'utf-8'))
})
