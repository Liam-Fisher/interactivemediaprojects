import { FaceName } from "src/app/types/rubix";

export function logCubeletState(names: string[]) {
    console.log(`... ... ... printing cubelets ... ... ... ... `);
    let letters = names.map((l,n) => l.at(-1)+(n<10?': ':':')+n); 
    console.log(`________front_layer_________`);
    console.log(`${letters[2]}|${letters[1]}|${letters[0]}`);
    console.log(`${letters[5]}|${letters[4]}|${letters[3]}`);
    console.log(`${letters[8]}|${letters[7]}|${letters[6]}`);
    console.log(`________middle_layer_________`);
    console.log(`${letters[11]}|${letters[10]}|${letters[9]}`);
    console.log(`${letters[14]}|${letters[13]}|${letters[12]}`);
    console.log(`${letters[17]}|${letters[16]}|${letters[15]}`);
    console.log(`________back_layer_________`);
    console.log(`${letters[20]}|${letters[19]}|${letters[18]}`);
    
    console.log(`${letters[23]}|${letters[22]}|${letters[21]}`);
    console.log(`${letters[26]}|${letters[25]}|${letters[24]}`);
    console.log(`... ... ... ...  ... ... ... ... ... ... `);
  }

  export function logRotationGroup(rotationNames: string[]) {
    let corners: string[] = [];
  let edges: string[] = [];
  let centers: string[] = [];
  for (let name of rotationNames) {
    if (name[1] === 'o') {
      corners.push(name.at(-1) as string);
    } else if (name[1] === 'd') {
      edges.push(name.at(-1) as string);
    } else if (name[1] === 'i') {
      centers.push('0');
    } else {
      centers.push(name.at(-1) as string);
    }
  }
  console.log(`rotating corners: ${corners.join('|')}`);
  console.log(`rotating edges: ${edges.join('|')}`);
  console.log(`rotating centers: ${centers.join('|')}`);
  }
  
  export function logFacelets(colors: Record<FaceName, number[]>) {
    console.log(`... ... ... printing faces ... ... ... ... `);
    for (let face in this.colors) {
      let colors = this.colors[face as FaceName];
      console.log(`${face}:           `);
      console.log(`${colors[2]}|${colors[1]}|${colors[0]}`);
      console.log(`${colors[5]}|${colors[4]}|${colors[3]}`);
      console.log(`${colors[8]}|${colors[7]}|${colors[6]}`);
    }
    console.log(`... ... ... ...  ... ... ... ... ... ... `);
  }