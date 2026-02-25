import { useCallback, useState } from 'react'
import './App.css'
import Card from './components/Card'
import { WithLoading } from './components/WithLoading'

function Panel({
  title,
  children,
  collapsible = false,
}: {
  title: string
  children: React.ReactNode
  collapsible?: boolean
}) {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div className="panel">
      <div className="panel-header">
        <h2>{title}</h2>
        {collapsible && (
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'Collapse' : 'Expand'}
          </button>
        )}
      </div>
      {isOpen && <div className="panel-content">{children}</div>}
    </div>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const handleLoading = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }
  return (
    <>
      <Card title="Hello">
        <p style={{ color: 'red' }}>World</p>
      </Card>
      <Panel title="Settings" collapsible>
        <p>Your settings here...</p>
      </Panel>
      <button onClick={handleLoading}>Toggle Loading</button>
      <WithLoading loading={isLoading}>
        <p>Content that is not loading</p>
      </WithLoading>
    </>
  )
}

export default App
