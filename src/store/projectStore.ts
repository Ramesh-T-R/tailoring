import { ProjectState, MeasurementProfile, PatternPiece } from '../types/project';
import { ConstraintSolver } from '../features/visualization/logic/geometry';

export interface ProjectStore {
  project: ProjectState;
  history: ProjectState[];
  updateMeasurements: (measurements: MeasurementProfile) => void;
  updatePiece: (pieceId: string, updates: Partial<PatternPiece>) => void;
  undo: () => void;
}

/**
 * Simplified state management for the MVP.
 * In a full implementation, this would use Zustand or Redux with Immer.
 */
export class StoreManager {
  private state: ProjectStore;

  constructor(initialProject: ProjectState) {
    this.state = {
      project: initialProject,
      history: [initialProject],
      updateMeasurements: (measurements) => this.handleUpdateMeasurements(measurements),
      updatePiece: (id, updates) => this.handleUpdatePiece(id, updates),
      undo: () => this.handleUndo()
    };
  }

  private handleUpdateMeasurements(measurements: MeasurementProfile) {
    const updatedPieces = this.state.project.pieces.map(piece => 
      ConstraintSolver.updatePiece(piece, measurements)
    );

    const nextState: ProjectState = {
      ...this.state.project,
      measurements,
      pieces: updatedPieces,
      version: this.state.project.version + 1
    };

    this.state.history.push(nextState);
    // Prune history to prevent memory bloat
    if (this.state.history.length > 50) {
      this.state.history.shift();
    }
    this.state.project = nextState;
  }

  private handleUpdatePiece(id: string, updates: Partial<PatternPiece>) {
    const updatedPieces = this.state.project.pieces.map(piece => 
      piece.id === id ? { ...piece, ...updates } : piece
    );

    const nextState: ProjectState = {
      ...this.state.project,
      pieces: updatedPieces,
      version: this.state.project.version + 1
    };

    this.state.history.push(nextState);
    // Prune history to prevent memory bloat
    if (this.state.history.length > 50) {
      this.state.history.shift();
    }
    this.state.project = nextState;
  }

  private handleUndo() {
    if (this.state.history.length > 1) {
      this.state.history.pop();
      this.state.project = this.state.history[this.state.history.length - 1];
    }
  }

  getState() {
    return this.state;
  }
}
