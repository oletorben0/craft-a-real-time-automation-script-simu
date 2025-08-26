TypeScript
// fk20_craft_a_real-ti.ts

// Import required libraries
import * as chalk from 'chalk';
import * as readline from 'readline';
import * as timers from 'timers';

// Define the simulator class
class AutomationScriptSimulator {
  private script: string[];
  private currentState: string;
  private timer: NodeJS.Timer;

  constructor(script: string[]) {
    this.script = script;
    this.currentState = 'idle';
  }

  // Start the simulation
  start() {
    this.currentState = 'running';
    this.timer = timers.setInterval(() => this.executeNextStep(), 1000);
  }

  // Execute the next step in the script
  private executeNextStep() {
    if (this.script.length === 0) {
      this.stop();
      return;
    }

    const step = this.script.shift();
    console.log(`Executing step: ${step}`);
    this.currentState = step;

    // Simulate a delay
    timers.setTimeout(() => this.executeNextStep(), 2000);
  }

  // Stop the simulation
  stop() {
    this.currentState = 'idle';
    timers.clearInterval(this.timer);
  }

  // Get the current state of the simulator
  getState() {
    return this.currentState;
  }
}

// Define the script steps
const script: string[] = [
  'Step 1: Initialize system',
  'Step 2: Connect to API',
  'Step 3: Authenticate user',
  'Step 4: Retrieve data',
  'Step 5: Process data',
  'Step 6: Display results',
];

// Create a new simulator instance
const simulator = new AutomationScriptSimulator(script);

// Create a readline interface to interact with the simulator
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Display the simulator menu
console.log(chalk.bold('Automation Script Simulator'));
console.log(chalk.blue('---------------------------'));
console.log('1. Start simulation');
console.log('2. Stop simulation');
console.log('3. Get current state');
console.log('4. Exit');

rl.setPrompt('> ');
rl.prompt();

// Handle user input
rl.on('line', (input) => {
  switch (input.trim()) {
    case '1':
      simulator.start();
      break;
    case '2':
      simulator.stop();
      break;
    case '3':
      console.log(`Current state: ${simulator.getState()}`);
      break;
    case '4':
      process.exit(0);
      break;
    default:
      console.log('Invalid input. Try again!');
  }
  rl.prompt();
}).on('close', () => {
  process.exit(0);
});