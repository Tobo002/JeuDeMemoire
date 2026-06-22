import { RESULTS_STORAGE_KEY } from './constants.js'

/**
 * @typedef {Object} SessionResults
 * @property {number} score
 * @property {number} accuracy
 * @property {number} longestMelody
 * @property {string} instrument
 * @property {string} difficulty
 */

/** @param {SessionResults} results */
export function saveSessionResults(results) {
  sessionStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(results))
}

/** @returns {SessionResults | null} */
export function loadSessionResults() {
  try {
    const raw = sessionStorage.getItem(RESULTS_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}
