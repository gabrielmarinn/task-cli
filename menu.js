import readline from 'readline'
import {
  addTask,
  updateTask,
  removeTask,
  listTasks,
} from './controllers/task-controller.js'

// Creating a terminal input interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Function display menu
const showMenu = () => {
  console.log('\n📌 Task Menu')
  console.log('1 - Add Task')
  console.log('2 - Update Task')
  console.log('3 - Remove Task')
  console.log('4 - List Task')
  console.log('5 - Exit')

  rl.question('Chosse an option: ', (choice) => {
    handleMenuChoice(choice)
  })
}

// Function to handle the user's choice
const handleMenuChoice = (choice) => {
  switch (choice) {
    case '1':
      rl.question('Enter the task description: ', (desc) => {
        addTask(desc)
        showMenu()
      })
      break

    case '2':
      rl.question('Enter the task id: ', (id) => {
        rl.question(
          'Enter the new status (pending, in progress, completed): ',
          (status) => {
            updateTask(id, status)
            showMenu()
          }
        )
      })
      break

    case '3':
      rl.question('Enter task id to remove: ', (id) => {
        removeTask(id)
        showMenu()
      })
      break

    case '4':
      rl.question(
        'Enter a filter (all, completed, pending, in progress): ',
        (filter) => {
          listTasks(filter)
          showMenu()
        }
      )
      break

    case '5':
      console.log('👋 Exit...')
      rl.close()
      break

    default:
      console.log('❌ Opção inválida.')
      showMenu()
  }
}

// Start Menu
export const startMenu = () => {
  showMenu()
}
