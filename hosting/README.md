# InteractiveMediaProjects
check it out [here](interactive-media-projects.web.app)
## RUBIX

A rubix cube rendered with threejs whose state is sent to a WASM compiled/designed using [rnbo](http://www.rnbo.cycling.com).
Clicking the "Load Audio" button will load the "device" (the WASM) from a cloud storage bucket and begin emitting audio.
The "letter" buttons allow rotating different slices of the cube by click or key input:
 - F
 - 
### Under The Hood
Three messaging channels are used between the ui, the cube state, and the wasm audio node:
 1. Face Colors: Visible Facelets (From Cube State Services) -> Notes of the active chord
 2. Move Input: Button UI () -> Playback Rhythm && Cube Animation
 3. Light Positions: Note Event (from WASM) -> Animated Positions of the Lights in the threejs scene.

The audio WASM cycles between a preset sequence of 6 note chords. 
Each of the 6 possible face colors are mapped to an index corresponding to the nth note of the current chord. 
Notes are played at 480 BPM (or 8 notes per second).

The internal state of the WASM includes the current and previous position for each light (front, left and top), and changes to a new position adjacent to the current one, moving "forward", so that repeated oscillation of states is not possible.

When this state changes (8 times per second), a set of parameters (amplitude and panning) for each harmonic (1st, 4th and 10th) is retrieved from a buffer, alongside a set of coefficients for the resonator. 

The amplitude and panning are static, (although they are accessible from the WASM interface).
These coefficients are recalculated every state change, and the most recent cube state is retrieved before each note. 

When a note is played, a position animation is triggered from within the WASM device (i wanted to try out the easing function), that changes a pair of parameters (front, left, top) from the previous position to the new one. 

These are used to control the positions of the lights in the threejs scene.


## Personal Notes

This project was mostly based around experimenting with the potential of using RNBO/ThreeJS for the audio and visuals in an interactive media project. I'm pretty happy with the results, but did run into some issues with latency...
If you are interested in creating similar projects (which I highly encourage), here are some of my findings:

### Connecting Message streams
I used an RXJS Behavior Subject to handle the "inport" and "outport" messages from the RNBO device. This was probably the easiest to set up but incurred the most latency (for example, there is an audible delay for the move input effect).
I'd recommend using these for state changes 
For two-way parameter control uis, (which were used for debugging purposes), I used Angular Signals, which had a tendency to settle at appropriate control rate for RNBO parameters.
Parameters controlling animations were subscribed to separately, and tended to update at frame rate or higher.
### Audio Latency
the audio latency was negligible with the emitted parameter events (e.g. the light animations) until around 40 BPM, where the light animation was visibly delayed from the note onset. As parameter change events are extremely responsive, a more "precise" audio -> visual correspondence at low event rates could be achieved by retrieving the latency from the audio context at runtime, assigning it to an rnbo parameter, and delaying the parameter change from within the device by this amount. 
