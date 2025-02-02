import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisualizationStateService {
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  private isPausedSubject = new BehaviorSubject<boolean>(false);
  private resetSubject = new Subject<void>();
  private currentStepSubject = new BehaviorSubject<string>('Initial array loaded');
  private speedSubject = new BehaviorSubject<number>(1000); // Default animation speed in ms

  // Public observables
  isPlaying$ = this.isPlayingSubject.asObservable();
  isPaused$ = this.isPausedSubject.asObservable();
  reset$ = this.resetSubject.asObservable();
  currentStep$ = this.currentStepSubject.asObservable();
  speed$ = this.speedSubject.asObservable();

  play() {
    console.log('🎬 Visualization: Started');
    this.isPlayingSubject.next(true);
    this.isPausedSubject.next(false);
  }

  pause() {
    console.log('⏸️ Visualization: Paused');
    this.isPausedSubject.next(true);
  }

  resume() {
    console.log('▶️ Visualization: Resumed');
    this.isPausedSubject.next(false);
  }

  stop() {
    console.log('⏹️ Visualization: Stopped');
    this.isPlayingSubject.next(false);
    this.isPausedSubject.next(false);
  }

  reset() {
    console.log('🔄 Visualization: Reset');
    this.stop();
    this.resetSubject.next();
    this.currentStepSubject.next('Initial array loaded');
  }

  setCurrentStep(step: string): void {
    console.log(`📍 Step: ${step}`);
    this.currentStepSubject.next(step);
  }

  setSpeed(speedMs: number) {
    console.log(`⚡ Speed changed to: ${speedMs}ms`);
    this.speedSubject.next(speedMs);
  }

  // Getter methods for current values
  get isPlaying(): boolean {
    return this.isPlayingSubject.value;
  }

  get isPaused(): boolean {
    return this.isPausedSubject.value;
  }

  get currentStep(): string {
    return this.currentStepSubject.value;
  }

  get speed(): number {
    return this.speedSubject.value;
  }

  // Helper method for components to wait while paused
  async waitForResume(): Promise<void> {
    return new Promise((resolve) => {
      const checkPaused = () => {
        if (!this.isPaused) {
          resolve();
        } else {
          setTimeout(checkPaused, 100);
        }
      };
      checkPaused();
    });
  }
} 