const NUM_FILTERS = 81; // faces * rows * columns * harmonics
const NUM_FREQS = 6;
const NUM_AMPS = 6;
@param({min: 0, max: 1}) gain = 0.5;
@param({min: 0, max: 1}) bandwidth = 0.5;
// 2 histories, 3 coefficients, amplitudeL, amplitudeR 
@state params = new data("resonatorData");
@state histories = new FixedFloat32Array(NUM_FILTERS, 2);

// using abs() to ensure it doesn't blow up with 
// negative bandwidth:
function getCoefficients(freq_rps, bw_rps) {
    let b = 2 * cos(freq_rps) * exp(bw_rps * -0.5);
    let c = -exp(-bw_rps);
    let a = 1 - ((c + b));
    return [a, b, c];
}
let bw_rps = abs(bandwidth) * twopi/samplerate;
let y1 = 0;
let y2 = 0;
let x = in1;
let sumL = 0;
let sumR = 0;
for (i=0; i<NUM_FILTERS; i+= 1) {
	// read this resonator's data:
	y2 = histories[i][1];
	y1 = histories[i][0];
	
	// this could be better optimized 
	// to calculate coefficients less frequently
	// if it is known that they cannot change at any time

    // Extract this to a function that calculates the coefficients from the frequency and bandwidth, as well as the active facelet state
	let freq = freqs[i];
	amp = peek(amps, i);
	// convert to radians per sample:
	let freq_rps = freq * twopi/samplerate;
	let coefficients = getCoefficients(freq_rps, bw_rps);
	
	// compute next y:
	y = coefficients[0]*x + coefficients[1]*y1 + coefficients[2]*y2;
	// update this resonator's history:
    histories[i][1] = y1;
    histories[i][0] = y;

	// mix into output:
	sum += y * amp;
}

out1 = sum * gain;