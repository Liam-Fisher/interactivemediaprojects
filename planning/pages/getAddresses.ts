function getAddresses(axis3d: 'x'|'y'|'z', orientation: boolean, slice: number): [string,number[]][] {
    if (axis3d === 'y') {
      if(orientation) { // 0,5,1,4,2,3
        if(slice === -1) {
          return [['front', [0,1,2]], ['right', [6,7,8]], ['back', [6,7,8]], ['left', [0,1,2]], ['top', []]];
        }
        else if(slice === 0) {
          return [['front', [3,4,5]], ['right', [3,4,5]], ['back', [3,4,5]], ['left', [3,4,5]]];
        }
        else {
          return [['front', [6,7,8]], ['right', [0,1,2]], ['back', [0,1,2]], ['left', [6,7,8]], ['bottom', []]];
        } 
      }
      else { // 0,4,5,1,2,3
        if(slice === -1) {
          return [['front', [0,1,2]], ['left', [0,1,2]], ['back', [6,7,8]], ['right', [6,7,8]], ['top', []]];
        }
        else if(slice === 0) {
          return [['front', [3,4,5]], ['left', [3,4,5]], ['back', [3,4,5]], ['right', [3,4,5]]];
        }
        else {
          return [['front', [6,7,8]], ['left', [6,7,8]], ['back', [0,1,2]], ['left', [6,7,8]], ['bottom', []]];
        } 
      }
    }
    throw new Error(`invalid axis ${axis3d}`); 
  }