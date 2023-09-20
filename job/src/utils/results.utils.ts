export class ResultsTracker {
  updated: string[] = [];
  created: string[] = [];
  error: string[] = [];

  trackResult(id: string, type: 'updated' | 'created' | 'error') {
    this[type] = [...this[type], id];
  }

  getResults() {
    return {
      updated: this.updated,
      created: this.created,
      error: this.error,
    };
  }
}
