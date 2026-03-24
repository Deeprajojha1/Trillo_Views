// App routes and global providers.
import { Layout } from './components/Layout'
import { TaskProvider } from './store/TaskProvider'
import { useRoute } from './hooks/useRoute'
import { BoardPage } from './views/BoardPage'
import { HomePage } from './views/HomePage'

function App() {
  const { path, navigate } = useRoute()

  return (
    <TaskProvider>
      <Layout>
        {path === '/' ? (
          <HomePage onStart={() => navigate('/board')} />
        ) : (
          <BoardPage />
        )}
      </Layout>
    </TaskProvider>
  )
}

export default App



