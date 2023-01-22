import CircularProgress from '@material-ui/core/CircularProgress'

interface LoadingSpinnerProps {
  size?: number
  marginTop?: string
}

const LoadingSpinner = ({ size, marginTop }: LoadingSpinnerProps) => {
  return (
    <div style={{ textAlign: 'center', marginTop: marginTop || '3em' }}>
      <CircularProgress disableShrink size={size || 80} />
    </div>
  )
}

export default LoadingSpinner
