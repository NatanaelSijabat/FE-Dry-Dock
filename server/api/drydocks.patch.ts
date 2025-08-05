import { defineEventHandler, readBody } from 'h3'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  const { categoryIndex, dockIndex, updates } = await readBody(event)
  const filePath = resolve(process.cwd(), '.data/docks.json')
  const data = JSON.parse(readFileSync(filePath, 'utf-8'))

  Object.assign(data[categoryIndex].docks[dockIndex], updates)
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')

  return { success: true, data: data[categoryIndex].docks[dockIndex] }
})
