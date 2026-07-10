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
const VOTED_POLLS_KEY = 'aic_voted_polls'

function readVotedIds() {
  try {
    const raw = localStorage.getItem(VOTED_POLLS_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

export function hasVoted(pollId) {
  return readVotedIds().has(pollId)
}

export function markVoted(pollId) {
  const ids = readVotedIds()
  ids.add(pollId)
  try {
    localStorage.setItem(VOTED_POLLS_KEY, JSON.stringify([...ids]))
  } catch {
    // Storage unavailable (private browsing, quota) — vote still succeeded
    // server-side, the de-dup convenience just won't persist this session.
  }
}
