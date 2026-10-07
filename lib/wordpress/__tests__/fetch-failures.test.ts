import { describe, it, expect } from 'vitest'
import { WordPressUnavailableError } from '../api'

describe('WordPress fetch failure semantics', () => {
  it('WordPressUnavailableError is exported and can be instantiated', () => {
    const error = new WordPressUnavailableError('Test error')
    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(WordPressUnavailableError)
    expect(error.name).toBe('WordPressUnavailableError')
    expect(error.message).toBe('Test error')
  })

  it('WordPressUnavailableError can store a cause', () => {
    const cause = new Error('Root cause')
    const error = new WordPressUnavailableError('Test error', cause)
    expect(error.cause).toBe(cause)
  })

})
