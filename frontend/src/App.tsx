 import { type FormEvent, useState } from 'react'

type Filter = 'all' | 'active' | 'completed'
type Task = { id: number; title: string; category: string; due: string; completed: boolean }


const categoryStyles: Record<string, string> = {
  Work: 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300',
  Design: 'bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300',
  Personal: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [newTask, setNewTask] = useState('')
  const [isDark, setIsDark] = useState(false)
  const visibleTasks = tasks.filter((task) => filter === 'all' || filter === (task.completed ? 'completed' : 'active'))
  const remaining = tasks.filter((task) => !task.completed).length

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const title = newTask.trim()
    if (!title) return
    setTasks((current) => [...current, { id: Date.now(), title, category: 'Personal', due: 'Today', completed: false }])
    setNewTask('')
  }

  function toggleTask(id: number) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task))
  }

  function deleteTask(id: number) {
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  return (
    <main className={isDark ? 'dark min-h-screen bg-[#111513] text-[#f4f1e9]' : 'min-h-screen bg-[#f5f7f4] text-[#17221c]'}>
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between border-b border-black/8 pb-5 dark:border-white/10">
          <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#213c2d] text-xl text-[#d9f36b]">✓</div><span className="text-lg font-bold tracking-tight">daymark</span></div>
          <button onClick={() => setIsDark((value) => !value)} aria-label="Toggle dark mode" className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-lg transition hover:border-[#91ad39] hover:text-[#647d20] dark:border-white/15 dark:bg-white/8 dark:hover:text-[#d9f36b]">{isDark ? '☼' : '☾'}</button>
        </header>

        <section className="grid flex-1 gap-12 py-12 lg:grid-cols-[1fr_2fr] lg:gap-24 lg:py-20">
          <div className="max-w-sm">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#79912e]">Monday, August 24</p>
            <h1 className="font-serif text-5xl leading-[0.98] tracking-tight sm:text-6xl">A little progress<br /><em className="text-[#78922c]">every day.</em></h1>
            <p className="mt-7 max-w-xs text-base leading-7 text-black/55 dark:text-white/55">Keep your focus close. The important things have a place here.</p>
            <div className="mt-12 flex items-end gap-4"><span className="font-serif text-6xl leading-none text-[#78922c]">{remaining}</span><span className="mb-1 text-sm leading-5 text-black/50 dark:text-white/50">tasks left<br />to finish</span></div>
          </div>

          <div className="w-full max-w-2xl">
            <form onSubmit={addTask} className="mb-8 flex items-center gap-3 rounded-2xl border border-black/10 bg-white p-2 pl-5 shadow-[0_12px_35px_rgba(30,48,35,0.06)] dark:border-white/10 dark:bg-white/6 dark:shadow-none"><span className="text-xl text-[#8ca241]">+</span><input value={newTask} onChange={(event) => setNewTask(event.target.value)} placeholder="What needs your attention?" className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-black/35 dark:placeholder:text-white/35" /><button type="submit" className="rounded-xl bg-[#213c2d] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#31583f]">Add task</button></form>

            <div className="mb-4 flex items-center justify-between border-b border-black/8 pb-3 dark:border-white/10"><h2 className="font-serif text-2xl">Your tasks</h2><div className="flex gap-1 rounded-lg bg-black/4 p-1 text-xs dark:bg-white/6">{(['all', 'active', 'completed'] as Filter[]).map((option) => <button key={option} onClick={() => setFilter(option)} className={`rounded-md px-3 py-1.5 capitalize transition ${filter === option ? 'bg-white font-bold shadow-sm dark:bg-white/15' : 'text-black/45 hover:text-black/80 dark:text-white/45 dark:hover:text-white/85'}`}>{option}</button>)}</div></div>

            <div className="divide-y divide-black/8 dark:divide-white/10">{visibleTasks.map((task) => <article key={task.id} className="group flex items-center gap-4 py-5 first:pt-3"><button onClick={() => toggleTask(task.id)} aria-label={task.completed ? `Mark ${task.title} active` : `Complete ${task.title}`} className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs transition ${task.completed ? 'border-[#78922c] bg-[#78922c] text-white' : 'border-black/20 text-transparent hover:border-[#78922c] dark:border-white/25'}`}>✓</button><div className="min-w-0 flex-1"><p className={`truncate text-[15px] font-semibold ${task.completed ? 'text-black/35 line-through dark:text-white/35' : ''}`}>{task.title}</p><div className="mt-2 flex items-center gap-2 text-xs text-black/40 dark:text-white/40"><span className={`rounded px-2 py-1 font-semibold ${categoryStyles[task.category]}`}>{task.category}</span><span>•</span><span>{task.due}</span></div></div><button onClick={() => deleteTask(task.id)} aria-label={`Delete ${task.title}`} title="Delete task" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xl text-black/30 transition hover:bg-red-50 hover:text-red-500 dark:text-white/30 dark:hover:bg-red-950/40">×</button></article>)}{visibleTasks.length === 0 && <p className="py-12 text-center text-sm text-black/45 dark:text-white/45">Nothing here yet. Enjoy the clear space.</p>}</div>
            <footer className="mt-7 flex items-center justify-between text-xs text-black/40 dark:text-white/40"><span>{tasks.length} total tasks</span><span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#92ad3b]" /> You’re doing well</span></footer>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
