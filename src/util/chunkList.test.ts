import { describe, expect, it } from 'vitest'
import { chunkList } from './chunkList'

describe('chunkList', () => {
  it('handles an empty list', () => {
    const list: string[] = []

    const result = chunkList(list, 50)

    expect(result).toEqual([])
  })

  it('handles an chunks list of 25 by 10', () => {
    const list = Array(25).fill(0)

    const result = chunkList(list, 10)

    expect(result).toHaveLength(3)
    expect(result[0]).toHaveLength(10)
    expect(result[1]).toHaveLength(10)
    expect(result[2]).toHaveLength(5)
  })
})
