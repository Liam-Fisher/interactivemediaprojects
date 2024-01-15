// RNBO script type checker should have the following features set:
    // Use should be able to add @state decorator to a class
/*     function state<T extends { new (...args: any[]): {} }>(constructor: T) {
            return class extends constructor {
                private state: number = 0;
                reset(): void { this.state = 0; }
                next(): number { return 0; }
            };
        }
        */

        /* @state */ 

        // @state _noiseA = new noise();
        // @state _noiseB = new noise();
        // @state _noiseC = new noise();
        // @state hRes1 = 0;