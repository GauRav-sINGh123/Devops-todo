import axios from 'axios'

export type Task = {
  _id: string
  title: string
  category: string
  due: string
  completed: boolean
}

type TaskResponse = {
  success: boolean
  data: Task
}

type TasksResponse = {
  success: boolean
  data: Task[]
}

const tasksApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1/tasks`,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function getTasks() {
  const response = await tasksApi.get<TasksResponse>('/')
  return response.data.data
}

export async function createTask(task: Pick<Task, 'title' | 'category' | 'due'>) {
  const response = await tasksApi.post<TaskResponse>('/', task)
  return response.data.data
}

export async function updateTask(id: string, changes: Partial<Pick<Task, 'title' | 'category' | 'due' | 'completed'>>) {
  const response = await tasksApi.put<TaskResponse>(`/${id}`, changes)
  return response.data.data
}

export async function deleteTask(id: string) {
  await tasksApi.delete(`/${id}`)
}
