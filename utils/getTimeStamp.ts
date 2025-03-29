// Todo Возможно через объект Intl лучше, может в нем есть готовые склонения

export const getTimeStamp = (createdAt: Date) => {
  const date = new Date(createdAt)
  const now = new Date()

  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000)

  const units = [
    { label: 'год', seconds: 31536000 },
    { label: 'месяц', seconds: 2592000 },
    { label: 'неделя', seconds: 604800 },
    { label: 'день', seconds: 86400 },
    { label: 'час', seconds: 3600 },
    { label: 'минута', seconds: 60 },
    { label: 'секунда', seconds: 1 },
  ]

  for (const unit of units) {
    const interval = Math.floor(secondsAgo / unit.seconds)
    if (interval >= 1) {
      return `${interval} ${unit.label}${interval > 1 ? 'ов' : ''} назад`
    }
  }
  return 'только что'
}
