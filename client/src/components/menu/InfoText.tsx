import { Typography } from '@material-ui/core'

interface InfoTextProps {
  text: string
  variant?: 'h6' | 'h5' | 'h4' | 'h3' | 'h2' | 'h1'
  marginTop?: string
}
const InfoText = ({ text, variant, marginTop }: InfoTextProps) => {
  return (
    <div style={{ textAlign: 'center', marginTop: marginTop || '4em' }}>
      <Typography variant={variant || 'h6'} color="secondary">
        {text}
      </Typography>
    </div>
  )
}

export default InfoText
