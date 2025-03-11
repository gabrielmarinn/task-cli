import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

// Creating __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Path of the json file
const FILE_PATH = path.join(__dirname, 'tasks.json')

// Function to ensure that the JSON file exists
const ensureFIleExists = () => {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      console.log('🔍 tasks.json file not found, creating a new one...')
      fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2))
      console.log('✅ tasks.json file created successfully!')
    }
  } catch (err) {
    console.err('❌ Error creating tasks.json:', err)
  }
}
// Calling the function to ensure that the file exists before any operation
ensureFIleExists()

// Funciton to load tasks into json
const loadTasks = () => {
  try {
    const data = fs.readFileSync(FILE_PATH, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    console.err('❌ Error to load tasks.json:', err)
    return []
  }
}

// Function to save tasks into json
const saveTasks = (tasks) => {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2))
  } catch (err) {
    console.log('❌ Error to save tasks:', err)
  }
}

// Captures the command line arguments
const args = process.argv.slice(2)
const command = args[0]

// Available commands
switch (command) {
  case 'add':
    addTask(args[1])
    break

  case 'update':
    updateTask(args[1], args[2])
    break

  case 'remove':
    removeTask(args[1])
    break

  case 'list':
    listTasks(args[1])
    break

  default:
    console.log('Available Commands:')
    console.log('Add task')
    console.log('Update task')
    console.log('Remove task')
    console.log('List tasks')
    break
}

// Function Add task
export function addTask(description) {
  if (!description) {
    console.log('❌ Error: You must provide a description for the task')
    return
  }

  const tasks = loadTasks()
  const newTask = {
    id: tasks.length + 1,
    description,
    status: 'pending', // Initial Status
  }

  tasks.push(newTask)
  saveTasks(tasks)
  console.log(`✅ Task add: ${description}`)
}

// Function update task
export function updateTask(id, status) {
  const validStatus = ['pending', 'in progress', 'completed']
  if (!validStatus.includes(status)) {
    console.log(
      '❌ Error: Invalid status. Use "pending", "in progress" or "completed".'
    )
    return
  }

  const tasks = loadTasks()
  const task = tasks.find((t) => t.id == id)

  if (!task) {
    console.log('❌ Error: Task not found.')
    return
  }

  task.status = status
  saveTasks(tasks)
  console.log(`🔄 Task ${id} now in "${status}".`)
}

// Function remove task
export function removeTask(id) {
  const tasks = loadTasks()
  const filteredTasks = tasks.filter((t) => t.id != id)

  if (tasks.length === filteredTasks.length) {
    console.log('❌ Error: Task not found.')
    return
  }

  saveTasks(filteredTasks)
  console.log(`🗑 Task ${id} removed.`)
}

// Function List tasks
export function listTasks(filter) {
  const tasks = loadTasks()
  let filteredTasks = tasks

  if (filter === 'completed') {
    filteredTasks = tasks.filter((t) => t.status === 'completed')
  } else if (filter === 'pending') {
    filteredTasks = tasks.filter((t) => t.status === 'pending')
  } else if (filter === 'in progress') {
    filteredTasks = tasks.filter((t) => t.status === 'in progress')
  }

  if (filteredTasks.length === 0) {
    console.log('📌 No task found')
    return
  }

  console.log('\n📋 Task list:')
  filteredTasks.forEach((t) => {
    console.log(`[${t.id}] ${t.description} ${t.status}`)
  })
}
