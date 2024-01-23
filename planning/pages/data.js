function reset() {
    // for each face

        for(let i=0;i<3;i++) {
            for(let j=0;j<9;j++) {
                for(let k=0;k<9;k++) {
                    for(let l=0;l<9;l++) {
                        listout1 = [i, j, k, l, 0];
                    }
                }
            }
    }
for(let i=0;i<3;i++) {
        graphWalkPositions[i][0] = 0; // current node
        graphWalkPositions[i][1] = 1; // previous node

        // here is our starter matrix
/// adjacencyMatrices[i][j][k][l]
/// for graph i, the probability of going from node j to node k if the previous node was l is adjacencyMatrices[i][j][k][l]
        
        // row 0, column 0
        adjacencyMatrices[i][0][1][3] = 1;
        adjacencyMatrices[i][0][3][1] = 1;

        // row 0, column 1
        adjacencyMatrices[i][1][0][2] = 0.5;
        adjacencyMatrices[i][1][0][4] = 0.5;

        adjacencyMatrices[i][1][2][0] = 0.5;
        adjacencyMatrices[i][1][2][4] = 0.5;
        
        adjacencyMatrices[i][1][4][0] = 0.5;
        adjacencyMatrices[i][1][4][2] = 0.5;

        // row 0, column 2
        adjacencyMatrices[i][2][1][5] = 1;
        adjacencyMatrices[i][2][5][1] = 1;

        // row 1, column 0
        adjacencyMatrices[i][3][0][4] = 0.5;
        adjacencyMatrices[i][3][0][7] = 0.5;
        
        adjacencyMatrices[i][3][4][0] = 0.5;
        adjacencyMatrices[i][3][4][7] = 0.5;

        adjacencyMatrices[i][3][7][0] = 0.5;
        adjacencyMatrices[i][3][7][4] = 0.5;
        


        // row 1, column 1
         adjacencyMatrices[i][4][1][3] =0.33333333;
        adjacencyMatrices[i][4][1][5] = 0.33333333;
        adjacencyMatrices[i][4][1][7] = 0.33333333;

        adjacencyMatrices[i][4][3][1] = 0.33333333;
        adjacencyMatrices[i][4][3][5] = 0.33333333;
        adjacencyMatrices[i][4][3][7] = 0.33333333;

        adjacencyMatrices[i][4][5][1] = 0.33333333;
        adjacencyMatrices[i][4][5][3] = 0.33333333;
        adjacencyMatrices[i][4][5][7] = 0.33333333;

        adjacencyMatrices[i][4][7][1] = 0.33333333;
        adjacencyMatrices[i][4][7][3] = 0.33333333;
        adjacencyMatrices[i][4][7][5] = 0.33333333;

        // row 1, column 2 

        adjacencyMatrices[i][5][2][4] = 0.5;
        adjacencyMatrices[i][5][2][8] = 0.5;

        adjacencyMatrices[i][5][4][2] = 0.5;
        adjacencyMatrices[i][5][4][8] = 0.5;

        adjacencyMatrices[i][5][8][2] = 0.5;
        adjacencyMatrices[i][5][8][4] = 0.5;

        // row 2, column 0
        adjacencyMatrices[i][6][3][7] = 1;
        adjacencyMatrices[i][6][7][3] = 1;

        // row 2, column 1
        adjacencyMatrices[i][7][4][6] = 0.5;
        adjacencyMatrices[i][7][4][8] = 0.5;
        
        adjacencyMatrices[i][7][6][4] = 0.5;
        adjacencyMatrices[i][7][6][8] = 0.5;

        adjacencyMatrices[i][7][8][4] = 0.5;
        adjacencyMatrices[i][7][8][6] = 0.5;

        // row 2, column 2
        adjacencyMatrices[i][8][7][5] = 1;
        adjacencyMatrices[i][8][5][7] = 1;
    }
}
function reset() {
    
    for(let i=0;i<3;i++) {
        for(let j=0;j<9;j++) {
            for(let k=0;k<9;k++) {
                for(let l=0;l<9;l++) {
                    listout1 = [i, j, k, l, 0];
                }
            }
        }
}
for(let i=0;i<3;i++) {
    listout1 = [i,0,0];
    listout1 = [i,1,1];
        // here are the nonZero entries in our facelet matrix
    listout1 = [i, 0, 1, 3, 1];
    listout1 = [i, 0, 3, 1, 1];
    listout1 = [i, 1, 0, 2, 0.5]; 
    listout1 = [i, 1, 0, 4, 0.5];
    listout1 = [i, 1, 2, 0, 0.5];
    listout1 = [i, 1, 2, 4, 0.5];
    listout1 = [i, 1, 4, 0, 0.5];
    listout1 = [i, 1, 4, 2, 0.5];
    listout1 = [i, 2, 1, 5, 1];
    listout1 = [i, 2, 5, 1, 1];

    listout1 = [i, 3, 0, 4, 0.5];
    listout1 = [i, 3, 0, 6, 0.5];
    listout1 = [i, 3, 4, 0, 0.5];
    listout1 = [i, 3, 4, 6, 0.5];
    listout1 = [i, 3, 6, 0, 0.5];
    listout1 = [i, 3, 6, 4, 0.5];

    listout1 = [i, 4, 1, 3, 0.33333333];
    listout1 = [i, 4, 1, 5, 0.33333333];
    listout1 = [i, 4, 1, 7, 0.33333333];
    listout1 = [i, 4, 3, 1, 0.33333333];
    listout1 = [i, 4, 3, 5, 0.33333333];
    listout1 = [i, 4, 3, 7, 0.33333333];
    listout1 = [i, 4, 5, 1, 0.33333333];
    listout1 = [i, 4, 5, 3, 0.33333333];
    listout1 = [i, 4, 5, 7, 0.33333333];
    listout1 = [i, 4, 7, 1, 0.33333333];
    listout1 = [i, 4, 7, 3, 0.33333333];
    listout1 = [i, 4, 7, 5, 0.33333333];

    listout1 = [i, 5, 2, 4, 0.5];
    listout1 = [i, 5, 2, 8, 0.5];
    listout1 = [i, 5, 4, 2, 0.5];
    listout1 = [i, 5, 4, 8, 0.5];
    listout1 = [i, 5, 8, 2, 0.5];
    listout1 = [i, 5, 8, 4, 0.5];

    listout1 = [i, 6, 3, 7, 1];
    listout1 = [i, 6, 7, 3, 1];

    listout1 = [i, 7, 4, 6, 0.5];
    listout1 = [i, 7, 4, 8, 0.5];
    listout1 = [i, 7, 6, 4, 0.5];
    listout1 = [i, 7, 6, 8, 0.5];
    listout1 = [i, 7, 8, 4, 0.5];
    listout1 = [i, 7, 8, 6, 0.5];
    
    listout1 = [i, 8, 7, 5, 1];
    listout1 = [i, 8, 5, 7, 1];

    for(let j = 0; j < 9; j++) {
        for(let k = 0; k < 2; k++) {
            listout1 = [i, j, k, i*2];
        }
    }


}
}
if(in1==-1) {
	reset();
	}