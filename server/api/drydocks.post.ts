import { defineEventHandler, readBody } from 'h3'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  const { categoryIndex } = await readBody(event)
  const filePath = resolve(process.cwd(), '.data/docks.json')
  const data = JSON.parse(readFileSync(filePath, 'utf-8'))

  const newDock = {
    title: '',
    description: '',
    no: `dock-${Date.now()}`,
    account_code: '',
    currency: '',
    responsible_rank: '',
    company: '',
    budget: '',
    planned_start_date: '',
    planned_end_date: '',
    actual_start_date: '',
    actual_end_date: '',
    image: '',
    status: 'Planning'
  }

  data[categoryIndex].docks.push(newDock)
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')

  return { success: true, data: newDock }
})
