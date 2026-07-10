import { doc, increment, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

// Atomic — bumps one option's tally and the poll's total by exactly 1.
// Matches the vote-only Firestore rule on polls/{id} (isVoteOnlyUpdate).
export async function castVote(pollId, optionId) {
  await updateDoc(doc(db, 'polls', pollId), {
    [`options.${optionId}.votes`]: increment(1),
    totalVotes: increment(1),
    updatedAt: serverTimestamp(),
  })
}

// Client-only convenience, not a security guarantee — clearing localStorage
// or writing to Firestore directly bypasses this. Firestore has no per-user
// identity to check against for anonymous community polling.
// Shape: { [pollId]: optionId } — records which option was chosen so the
// results view can mark "your vote" after a reload.
const VOTED_POLLS_KEY = 'aic_voted_polls'

function readVotes() {
  try {
    const raw = localStorage.getItem(VOTED_POLLS_KEY)
    const parsed = raw ? JSON.parse(raw) : {}
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {}
  } catch {
    return {}
  }
}

export function hasVoted(pollId) {
  return Object.prototype.hasOwnProperty.call(readVotes(), pollId)
}

export function getVotedOptionId(pollId) {
  return readVotes()[pollId] ?? null
}

export function markVoted(pollId, optionId = null) {
  const votes = readVotes()
  votes[pollId] = optionId
  try {
    localStorage.setItem(VOTED_POLLS_KEY, JSON.stringify(votes))
  } catch {
    // Storage unavailable (private browsing, quota) — vote still succeeded
    // server-side, the de-dup convenience just won't persist this session.
  }
}
