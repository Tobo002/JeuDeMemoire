/**
 * @param {number} length
 * @param {string[]} pool
 * @returns {string[]}
 */
export function generateSequence(length, pool) {
  return Array.from({ length }, () => {
    const index = Math.floor(Math.random() * pool.length)
    return pool[index]
  })
}
