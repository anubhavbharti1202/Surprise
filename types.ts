
export enum AppState {
  INTRO = 'INTRO',           // GF sees initial message
  QUESTION = 'QUESTION',     // Asking the big question
  ACCEPTED = 'ACCEPTED',     // She clicked Yes
  REJECTED = 'REJECTED'      // She clicked No
}

export type KiwiMood = 'curious' | 'happy' | 'sad' | 'dancing' | 'hiding';
