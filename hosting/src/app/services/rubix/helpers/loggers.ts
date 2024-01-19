import { FaceName } from "src/app/types/rubix";

export function logCubeletState(names: string[]) {/* 
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
    console.log(`... ... ... ...  ... ... ... ... ... ... `); */
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
  
  export function logFacelets(faceColors: Record<FaceName, number[]>) {
    let t=faceColors['top'];
    let r=faceColors['right'];
    let f=faceColors['front'];
    let l=faceColors['left'];
    let b=faceColors['back'];
    let x=faceColors['bottom'];
console.log(`... ... ... printing faces ... ... ... ... `);
    console.log(`V xy V Top V xy V`);
    console.log(`::    <${t[0]}>     ::`);
    console.log(`   <${t[3]}> X <${t[1]}> `);
    console.log(`<${t[6]}> X <${t[4]}> X <${t[2]}>`);
    console.log(`   <${t[7]}> X <${t[5]}> `);
    console.log(`::    <${t[8]}>     ::`);
    console.log(`front | right`);
    console.log(`${f[0]}|${f[1]}|${f[2]} | ${r[0]}|${r[1]}|${r[2]}`);
    console.log(`${f[3]}|${f[4]}|${f[5]} | ${r[3]}|${r[4]}|${r[5]}`);
    console.log(`${f[6]}|${f[7]}|${f[8]} | ${r[6]}|${r[7]}|${r[8]}`);

    console.log(`inside the cube`);

    console.log(` left | back `);
    console.log(`${l[0]}|${l[1]}|${l[2]} | ${b[0]}|${b[1]}|${b[2]}`);
    console.log(`${l[3]}|${l[4]}|${l[5]} | ${b[3]}|${b[4]}|${b[5]}`);
    console.log(`${l[6]}|${l[7]}|${l[8]} | ${b[6]}|${b[7]}|${b[8]}`);
    
    console.log(`::    <${x[6]}>     ::`);
    console.log(`   <${x[3]}> X <${x[7]}> `);
    console.log(`<${x[0]}> X <${x[4]}> X <${x[8]}>`);
    console.log(`   <${x[1]}> X <${x[5]}> `);
    console.log(`::    <${x[2]}>     ::`);
    console.log(`^ -xy ^ Bottom ^ -xy - ^`);
    

    console.log(`... ... ... ...  ... ... ... ... ... ... `); 
    // left is front or back
    /* 
    console.log(`... ... ... printing faces ... ... ... ... `);
    for (let face in faceColors) {
      let colors = faceColors[face as FaceName];
      console.log(`${face}:           `);
      console.log(`${colors[2]}|${colors[1]}|${colors[0]}`);
      console.log(`${colors[5]}|${colors[4]}|${colors[3]}`);
      console.log(`${colors[8]}|${colors[7]}|${colors[6]}`);
    }
    console.log(`... ... ... ...  ... ... ... ... ... ... `); */
  }