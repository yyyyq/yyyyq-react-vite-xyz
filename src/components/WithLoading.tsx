export const WithLoading = (props: {
  children: React.ReactNode
  loading: boolean
}) => {
  if (props.loading) {
    return <div className="loading">Loading...</div>
  }
  return <>{props.children}</>
}
