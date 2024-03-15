export const chunkList = <T>(list: T[], chunkSize: number) => {
  if (!list.length) {
    return []
  }

  return list.reduce(
    (acc, item) => {
      const current = acc[acc.length - 1]
      current.push(item)

      if (current.length === chunkSize) {
        acc.push([])
      }

      return acc
    },
    [[]] as T[][]
  )
}
